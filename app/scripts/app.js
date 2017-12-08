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
    ;

// shared actions
function actions(user, recentSearches) {
    return {
        searchUser: function(username) {
            recentSearches.addSearch(username);
            user.setUsername(username);
            API.getUser(username)
                .then(function(user){
                    user.setBio(user);
                })
                .catch(function() {
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

    model.setUsername = function(username) {
        model.username = username;
    }

    model.setBio = function (bio) {
        angular.extend(model.bio, bio);
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
        actions.searchUser($scope.username);
        e.preventDefault();
    }
}

function RecentSearchCtrl($scope, recentSearches, actions) {
    $scope.searches = recentSearches.searches;
    $scope.remove = recentSearches.remove;
    $scope.search = function (search) {
        actions.searchUser(seacrh);
    }
}

// RecentSearchCtrl
// OrgsSearchCtrl
// UserBioCtrl
// UserReposCtrl
