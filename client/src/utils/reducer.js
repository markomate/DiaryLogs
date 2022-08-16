export const reducer = (state, action) => {
  // console.log(state)
  // console.log(action)

  switch (action.type) {
    case "cleanState": {
      // state goes back to default values
      return {
        logList: [],
        loggedInUser: "",
      };
    }
    case "setLoggedInUser": {
      // updates the loggedInUser value
      return {
        ...state,
        loggedInUser: action.data,
      };
    }
    case "setToken": {
      // updates the token value
      return {
        ...state,
        token: action.data,
      };
    }
    case "setLogList": {
      // populates the logList Array with the models values
      return {
        ...state,
        logList: action.data,
      };
    }
    case "addLog": {
      // adds an object to to the logList array
      return {
        ...state,
        logList: [action.data, ...state.logList],
      };
<<<<<<< HEAD
    }
    case "editLog": {
      // edits the selected log and removes the original from the list
      let updatedList = state.logList.filter(
        (log) => log.id !== action.data.id
      );
      return {
        ...state,
        logList: [action.data, ...updatedList],
      };
    }
    case "deleteLog": {
      // deletes a log from the logList array based on it's ID
      // updates logList with the new array
      let updatedList = state.logList.filter((log) => log.id !== action.data);
      return {
        ...state,
        logList: updatedList,
      };
    }
    default:
      return state;
  }
};
=======
    }
    case "editLog": {
      // edits the selected log and removes the original from the list
      let updatedList = state.logList.filter(
        (log) => log.id !== action.data.id
      );
      return {
        ...state,
        logList: [action.data, ...updatedList],
      };
    }
    case "deleteLog": {
      // deletes a log from the logList array based on it's ID
      // updates logList with the new array
      let updatedList = state.logList.filter((log) => log.id !== action.data);
      return {
        ...state,
        logList: updatedList,
      };
    }
    default:
      return state;
  }
};
>>>>>>> fb5e43021833e37b55161eb532a89258640e5bc8
