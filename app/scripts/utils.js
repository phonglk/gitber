// API Section
var CLIENT='69af424226e15a6396dd';
var SECRET='683d05837403207f247939ab21668065352b65db';
var OAUTH = '?client_id='+client+'&client_secret='+secret;

var API_URL = 'https://api.github.com';

// uniform jquery request
function request(url) {
    return new Promise(function (resolve, reject){
        $.getJSON(url)
            .done(function(data) {
                resolve(data);
            })
            .fail(function(){
                reject(false);
            })
    });
}

function getUser(username) {
    var url = API_URL + '/users/' + username + OAUTH;
    return request(url);
}

function getRepos(username) {
    var url = API_URL + '/users/' + username + '/repos' + OAUTH;
    return request(url);
}

function getReadme(username, repoName) {
    var url = API_URL + '/repos/' + username + '/' + repoName + '/readme' + OAUTH;
    return request(url);
}

function getOrgs(org) {
    var url = API_URL + '/orgs/' + username + '/members' + OAUTH;
    return request(url);
}

window.API = {
    getUser: getUser,
    getRepos: getRepos,
    getReadme: getReadme,
    getOrgs: getOrgs,
}

function formatJoinDate(joined) {
    var joined = Date.parse(joined);
    return joined.toString("d MMMM yyyy");
};
