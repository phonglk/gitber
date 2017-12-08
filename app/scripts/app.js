/**
 *
 */

var app = angular
    .module('app', [])
    .factory('user', user)
    .factory('recentSearches', recentSearches)
    .factory('repos', repos)
    .factory('actions', actions)
    .controller('UserSearchCtrl', UserSearchCtrl)
    .controller('RecentSearchCtrl', RecentSearchCtrl)
    .controller('UserBioCtrl', UserBioCtrl)
    .controller('UserReposCtrl', UserReposCtrl)
    .controller('OrgsSearchCtrl', OrgsSearchCtrl)
    ;

// shared actions
function actions(user, recentSearches, repos) {
    return {
        searchUser: function(username, $scope) {
            recentSearches.addSearch(username);
            user.setUsername(username);
            API.getUser(username)
                .then(function(data){
                    user.setBio(data);
                    $scope.$apply();
                })
                .catch(function(e) {
                    console.log(e);
                    user.setBio({});
                });
            // --
            function requestRepo(repo) {
                return new Promise(function (resolve) {
                    API.getReadme(username, repo.name)
                        .then(function(data) {
                            repo.readme = $.base64Decode(data.content);
                            resolve(repo);
                        })
                        .catch(function() {
                            resolve(repo)
                        })
                });
            }
            function requestRepos(repos) {
                return Promise.all(repos.map(requestRepo));
            }
            API.getRepos(username)
                .then(requestRepos)
                .then(function(_repos) {
                    repos.setRepos(_repos);
                    $scope.$apply();
                })
        },
        searchOrg: function (orgname) {
            return API.getOrgs(orgname);
        }
    }
}

/** Models */
// user
function user() {
    var model = {
        username: '',
        bio: {},
    };

    model.setUsername = function (_username) {
        model.username = _username;
    }

    model.setBio = function (_bio) {
        model.bio = _bio;
    }

    return model;
}
// recentSearches
function recentSearches() {
    var model = {
        searches: [],
    };

    model.remove = function (search) {
        if (model.searches.indexOf(search) > -1) {
            // remove existing one
            model.searches.splice(
                model.searches.indexOf(search),
                1
            );
        }
    }

    model.addSearch = function(search) {
        model.remove(search);
        model.searches.unshift(search) // push to top
    }

    return model;
}
// repositories
function repos() {
    var model = {
        repos: [],
    };

    model.setRepos = function (repos) {
        model.repos = repos;
    }

    return model;
}

/** Controllers */
// UserSearchCtrl
function UserSearchCtrl($scope, user, actions) {
    $scope.username = user.username;
    $scope.search = function (e) {
        actions.searchUser($scope.username, $scope);
        e.preventDefault();
    }

    $scope.$watch(
        function () { return user.username; },
        function (newVal) {
            if (newVal !== $scope.username) {
                $scope.username = newVal;
            }
        },
    true);
}

// RecentSearchCtrl
function RecentSearchCtrl($scope, recentSearches, actions) {
    $scope.searches = recentSearches.searches;
    $scope.remove = function(search, e) {
        recentSearches.remove(search);
        e.preventDefault();
    };
    $scope.search = function (search, e) {
        actions.searchUser(search, $scope);
        e.preventDefault();
    }
}

// OrgsSearchCtrl
function OrgsSearchCtrl($scope, actions) {
    $scope.members = [];
    $scope.orgname = '';
    $scope.search =  function (e) {
        actions.searchOrg($scope.orgname)
            .then(function (members) {
                $scope.members = members;
                $scope.$apply();
            })
    }
    $scope.searchUser = function(username, e) {
        actions.searchUser(username, $scope);
        e.preventDefault();
    }
}

// UserBioCtrl
function UserBioCtrl($scope, user) {
    $scope.user = user.bio;

    $scope.$watch(
        function () {
            return user.bio;
        },
        function (newVal) {
            if (newVal !== $scope.user) {
                $scope.user = newVal;
            }
        },
    true);
}
// UserReposCtrl
function UserReposCtrl($scope, repos) {
    $scope.repos = repos.repos;
    $scope.$watch(
        function () {
            return repos.repos;
        },
        function (newVal) {
            if (newVal !== $scope.repos) {
                $scope.repos = newVal;
            }
        },
    true);
}
