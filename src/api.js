var CLIENT='69af424226e15a6396dd';
var SECRET='683d05837403207f247939ab21668065352b65db';
var OAUTH = `?client_id=${CLIENT}&client_secret=${SECRET}`;

var API_URL = 'https://api.github.com';

const get = url => fetch(url).then(resp => resp.json());

const getUserInfo = username => get(`${API_URL}/users/${username}${OAUTH}`)
  .then(value => ({
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
      })
  );

const getRepos = username => get(`${API_URL}/users/${username}/repos${OAUTH}`)
    .then(repos => repos.map(value => ({
        name: value.name,
        created: value.created_at,
        repoUrl: value.clone_url,
        language: value.language,
        size: value.size,
        avatar: value.owner.avatar_url,
        owner: value.owner.login,
        readme: 'No readme found',
      })
    )
  );

const getReadme = (username, repoName) => get(`${API_URL}/repos/${username}/${repoName}/readme${OAUTH}`);

export const getUser = username => Promise.all([
  getUserInfo(username),
  getRepos(username)
    .then(repos => Promise.all(
      repos.map(repo => new Promise(resolve => {
        getReadme(username, repo.name)
          .then(data => resolve({
            ...repo,
            readme: window.atob(data.content)
          }))
          .catch(() => resolve(repo))
      }))
    ))
])
  .then(([bio, repos]) => ({ bio, repos }));

export const getOrgs = org => get(`${API_URL}/orgs/${org}/members${OAUTH}`)
    .then(members => members.map(member => ({username: member.login})))