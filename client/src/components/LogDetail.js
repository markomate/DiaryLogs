import { Link, useNavigate, useParams } from "react-router-dom";
import { useGlobalState } from "../utils/stateContext";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { removeLog } from '../services/logsServices'
import Moment from "react-moment";

const LogDetail = () => {
  const { store, dispatch } = useGlobalState();
  const { logList } = store;
  const params = useParams();
  const navigate = useNavigate()

  const getLog = (id) => {
    return logList.find((l) => l.id === id);
  };

  const deleteLog = (e) => {
    e.preventDefault()
    removeLog(params.logId)
    .then((data) => {
      dispatch({
        type: "deleteLog",
        data: params.logId
      })
    })
    navigate("/logs")
  }

  const editLog = (e) => {
    e.preventDefault()
    navigate(`/logs/edit/${params.logId}`)
  }

  const log = getLog(params.logId);

  return (
    <>
      {log ? (
        <Card>
            <CardContent>
              <Typography variant="body1">
                Start time: <Moment>{log.startTime}</Moment>
              </Typography>
              <Typography variant="body1">
                Finish time: <Moment>{log.finishTime}</Moment>
              </Typography>
              <Typography variant="body1">Commment: {log.comment}</Typography>
              <Typography variant="caption">
                Log created: <Moment>{log.posted}</Moment>
              </Typography>
            </CardContent>
            <Button variant="contained" onClick={editLog}>Edit</Button>
            <Button>Back</Button>
            <Button variant="contained" onClick={deleteLog}>Delete</Button>
        </Card>
      ) : (
        <>
          <p>Log not found</p>
          <Link to="/">Go back to the main page</Link>
        </>
      )}
    </>
  );
};
export default LogDetail;
