export const USER_SEARCH_PROGRESS = 'USER_SEARCH_PROGRESS';
export const USER_SEARCH_DONE = 'USER_SEARCH_DONE';
export const ORGS_SEARCH_PROGRESS = 'ORGS_SEARCH_PROGRESS';
export const ORGS_SEARCH_DONE = 'ORGS_SEARCH_DONE';

import {
  getOrgs,
  getUser
} from '../api';

function searchUser(username) {
  return dispatch => {
    dispatch({
      type: USER_SEARCH_PROGRESS,
      payload: { username },
    });
    getUser(username)
      .then(payload => dispatch({
        type: USER_SEARCH_DONE,
        payload
      }))
  }
}

function searchOrgs(org) {
  return dispatch => {
    dispatch({
      type: ORGS_SEARCH_PROGRESS
    });
    getOrgs(org)
      .then(payload => dispatch({
        type: ORGS_SEARCH_DONE,
        payload
      }));
  }
}