/**
 *
 */

var app = angular
    .module('app', [])
    .factory('user', user)
    .factory('recentSearches', recentSearches)
    .factory('actions', actions)
    .controller('UserSearchCtrl', UserSearchCtrl)
    .controller('RecentSearchCtrl', RecentSearchCtrl)
    .controller('UserBioCtrl', UserBioCtrl)
    ;

// shared actions
function actions(user, recentSearches) {
    return {
        searchUser: function(username, $apply) {
            recentSearches.addSearch(username);
            user.setUsername(username);
            API.getUser(username)
                .then(function(data){
                    user.setBio(data);
                    $apply();
                })
                .catch(function(e) {
                    console.log(e);
                    user.setBio({});
                });
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

/** Controllers */
// UserSearchCtrl
function UserSearchCtrl($scope, user, actions) {
    $scope.username = user.username;
    $scope.search = function (e) {
        actions.searchUser($scope.username, $scope.$apply);
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

function RecentSearchCtrl($scope, recentSearches, actions) {
    $scope.searches = recentSearches.searches;
    $scope.remove = function(search, e) {
        recentSearches.remove(search);
        e.preventDefault();
    };
    $scope.search = function (search, e) {
        actions.searchUser(search, $scope.$apply);
        e.preventDefault();
    }
}

// RecentSearchCtrl
// OrgsSearchCtrl
// UserBioCtrl
function UserBioCtrl($scope, user) {
    $scope.user = user.bio;

    $scope.$watch(
        function () {
            console.log(user.bio, user.username)
            return user.bio;
        },
        function (newVal) {
            if (newVal !== $scope.user) {
                console.log(newVal);
                $scope.user = newVal;
            }
        },
    true);
}
// UserReposCtrl
