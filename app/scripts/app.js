/**
 *
 */

var app = angular
    .module('app', [])
    .factory('user', user)
    .controller('UserSearchCtrl', UserSearchCtrl);

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
// repositories

/** Controllers */
// UserSearchCtrl
function UserSearchCtrl($scope, user) {
    $scope.username = user.username;
    $scope.search = function (e) {
        API.getUser($scope.username)
            .then(function(user){
                user.setBio(user);
            })
            .catch(function() {
                user.setBio({});
            })
        e.preventDefault();
    }
}
// RecentSearchCtrl
// OrgsSearchCtrl
// UserBioCtrl
// UserReposCtrl
