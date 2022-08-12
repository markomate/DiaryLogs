export const reducer = (state, action) => {
  switch(action.type){
    case "cleanState": {
      // state goes back to default values
      return {
        loggedInUser: ""
      }
    }
    case "setLoggedInUser": {
      // updates the loggedInUser value
      return {
        ...state,
        loggedInUser: action.data
      }
    }
    case "setToken": {
      // updates the token value
      return {
        ...state,
        token: action.data
      }
    }
    default: return state
  }
}