// API Section
var CLIENT='69af424226e15a6396dd';
var SECRET='683d05837403207f247939ab21668065352b65db';
var OAUTH = '?client_id='+CLIENT+'&client_secret='+SECRET;

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
    return request(url).then(function(value){
        return {
            username: value.login,
            avatar: value.avatar_url,
            name: value.name,
            company: value.company,
            blog: value.blog,
            location: value.location,
            email: value.email,
            hireable: value.hireable,
            bio: value.bio,
            repos: value.public_repos,
            followers: value.followers,
            joined: value.created_at
        }
    });
}

function getRepos(username) {
    var url = API_URL + '/users/' + username + '/repos' + OAUTH;
    return request(url).then(function(repos) {
        return repos.map(function(value) {
            return {
                name: value.name,
                created: value.created_at,
                repoUrl: value.clone_url,
                language: value.language,
                size: value.size,
                avatar: value.owner.avatar_url,
                owner: value.owner.login,
                readme: 'No readme found',
            }
        })
    });
}

function getReadme(username, repoName) {
    var url = API_URL + '/repos/' + username + '/' + repoName + '/readme' + OAUTH;
    return request(url);
}

function getOrgs(org) {
    var url = API_URL + '/orgs/' + org + '/members' + OAUTH;
    return request(url).then(function(members) {
        return members.map(function(member) {
            return {username: member.login};
        });
    });
}

var API = {
    getUser: getUser,
    getRepos: getRepos,
    getReadme: getReadme,
    getOrgs: getOrgs,
}

function formatJoinDate(joined) {
    var joined = Date.parse(joined);
    return joined.toString("d MMMM yyyy");
};
