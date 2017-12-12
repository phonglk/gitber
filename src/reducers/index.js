import { 
  USER_SEARCH_PROGRESS,
  USER_SEARCH_DONE,
  ORGS_SEARCH_DONE,
  ORGS_SEARCH_PROGRESS,
 } from '../actions';

 const defaultState = {
  isSearchingOrg: false,
  isSearchingUser: false,
  username: '',
  bio: null,
  repos: [],
  orgUsers: [],
  recentSearches: [],
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case USER_SEARCH_PROGRESS: return { 
      ...state,
      isSearchingUser: true,
      username: action.payload.username,
      recentSearches: [action.payload.username]
        .concat(state.recentSearches
          .filter(username => username !== action.payload.username)
        )
    }
    case USER_SEARCH_DONE: return {
      ...state,
      isSearchingUser: false,
      bio: action.payload.bio,
      repos: action.payload.repos,
    }
    case ORGS_SEARCH_PROGRESS: return {
      ...state,
      isSearchingOrg: true,
    }
    case ORGS_SEARCH_DONE: return {
      ...state,
      isSearchingOrg: false,
      orgUsers: action.payload,
    }
    default : return state;
  }
}