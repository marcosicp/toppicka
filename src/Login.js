import React, { useContext, useEffect } from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import "firebase/auth";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "./firebase/FirebaseContext";
import firebase2 from "firebase/app";

function Login() {
  const history = useHistory();
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    const loggedInUserCookie = localStorage.getItem("user");

    if (loggedInUserCookie !== "undefined" && loggedInUserCookie !== null) {
      let loggedInUserObject = JSON.parse(loggedInUserCookie);
      if (loggedInUserObject !== null) {
        // window.location.href = "/login";
      }
    }
  }, []);

  const auth = firebase2.auth();
  const provider = new firebase2.auth.GoogleAuthProvider();
  const signIn = () => {
    firebase.auth
      .signInWithPopup(provider)
      .then((result) => {
        localStorage.setItem("user", JSON.stringify(result.user));
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <img className="logo1" src="img/toppicka-comillas.jpg" alt="" />

      <img className="logo2" src="img/toppicka-letras.jpg" alt="" />
      <Button type="submit" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Login;
