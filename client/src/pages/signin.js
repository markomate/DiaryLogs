import { React, useEffect } from 'react';
import jwt_decode from "jwt-decode";

const SignIn = () => {

  function handleCallbackResponse(response) {
    console.log("JWT: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
  }
  
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "140772636975-rqmm3dt7ruk79rq840iueqibaaj5o588.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });
  
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    );
  }, []);

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh'}}>
      <div id="signInDiv"></div>
    </div>
  )
}

export default SignIn