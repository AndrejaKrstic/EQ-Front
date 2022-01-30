import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "./logo-blue.png";

function Login() {
  document.body.style.overflowY = "hidden";
  const [userData, setUserData] = useState({
    korisnicko_ime: "",
    password: "",
  });
  let navigate = useNavigate();
  function handleInput(e) {
    let newUserData = userData;
    newUserData[e.target.name] = e.target.value;
    setUserData(newUserData);
    console.log(userData);
  }
  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("login", userData)
      .then((res) => {
        console.log(res.data);
        window.sessionStorage.setItem("auth_token", res.data.access_token);
        window.sessionStorage.setItem("imePrezime", res.data.imePrezime);
        window.sessionStorage.setItem("id", res.data.id);
        if (res.data.success == false) {
          document.getElementById("txt-login-error").style.display = "block";
        } else {
          navigate("/");
        }
      })
      .catch((e) => console.log(e));
  }
  return (
    <>
      <span className="circle-login-1"></span>
      <span className="circle-login-2"></span>
      <span className="circle-login-3"></span>
      <span className="circle-login-4"></span>
      {/* <p className="txt-logo-login">EQ</p> */}
      <img src={logo} className="img-logo-blue" />
      <div className="div-login" style={{ color: "#0077B6" }}>
        <h3>Login</h3>
        <form className="form-login" onSubmit={handleLogin}>
          <input
            className="input-username-login"
            type="username"
            name="korisnicko_ime"
            onInput={handleInput}
            required
          />
          <p className="txt-login">Korisničko ime</p>
          <input
            className="input-password-login"
            type="password"
            name="password"
            onInput={(e) => handleInput(e)}
            required
          />
          <p className="txt-login">Lozinka</p>
          <p className="txt-login-error" id="txt-login-error">
            Profil sa unetim podacima ne postoji, pokušajte ponovo.
          </p>
          <button className="btn-login" type="submit">
            Uloguj se
          </button>
          <p className="txt-login">
            Nemate nalog? Registrujte se{" "}
            <a href="/register" className="link-register">
              ovde!
            </a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
