export const reducer = (state, action) => {
  console.log(state)
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
    case "setLogList": {
      // populate the logList Array with the initial values
      return {
        ...state,
        logList: action.data
      }
    }
    case "addLog": {
      // populate the logList Array with the initial values
      return {
        ...state,
        logList: [action.data, ...state.logList]
      }
    }
    default: return state
  }
}