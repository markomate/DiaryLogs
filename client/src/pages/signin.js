// import { React, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
// import { useGlobalState } from "../utils/stateContext";
// import jwt_decode from "jwt-decode";

// const Oauth = () => {
//   const { dispatch } = useGlobalState();
//   const navigate = useNavigate();

//   function handleCallbackResponse(response) {
//     const username = jwt_decode(response.credential.name);
//     const jwt = response.credential
//     sessionStorage.setItem("username", username);
//     sessionStorage.setItem("token", jwt);
//     dispatch({
//       type: "setLoggedInUser",
//       data: username,
//     });
//     dispatch({
//       type: "setToken",
//       data: jwt,
//     });
//     navigate("/logs");
//   }
  
//   useEffect(() => {
//     /* global google */
//     google.accounts.id.initialize({
//       client_id: "140772636975-rqmm3dt7ruk79rq840iueqibaaj5o588.apps.googleusercontent.com",
//       callback: handleCallbackResponse
//     });
  
//     google.accounts.id.renderButton(
//       document.getElementById("signInDiv"),
//       { theme: "outline", size: "large"}
//     );

//   }, []); 

//   return (
//     <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh'}}>
//       <div id="signInDiv"></div>
//     </div>
//   )
// }

// export default Oauth