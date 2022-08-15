export const reducer = (state, action) => {
  // console.log(state)
  console.log(action)

  switch(action.type){
    case "cleanState": {
      // state goes back to default values
      return {
        logList: [],
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
    case "setLogList": {
      // populates the logList Array with the models values
      return {
        ...state,
        logList: action.data
      }
    }
    case "addLog": {
      // adds an object to to the logList array
      return {
        ...state,
        logList: [action.data, ...state.logList]
      }
    }
    default: return state
  }
}