import { useGlobalState } from "../utils/stateContext";
import Button from "@mui/material/Button";
import Log from "./Log";

const Logs = () => {
  const { store } = useGlobalState();
  const { logList, loggedInUser } = store;

  const userList = logList.filter((log) => log.username === loggedInUser);

  if (userList.length === 0) {
    return (
      <div className="Card" style={{ textAlign: "center" }}>
        Click here to create a new log:
        <div style={{ padding: "10px" }}>
          <Button variant="contained" color="secondary" href="/logs/new">
            New Log
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Card">
        {userList.map((log) => (
          <Log key={log.id} log={log} />
        ))}
      </div>
    );
  }
};
export default Logs;
