import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [userData, setUserData] = useState({
    ime: "",
    prezime: "",
    korisnicko_ime: "",
    naziv_jezika: "",
    nivo: "",
    password: "",
  });
  let navigate = useNavigate();
  function handleInput(e) {
    let newUserData = userData;
    newUserData[e.target.name] = e.target.value;
    setUserData(newUserData);
  }
  function handleRegister(e) {
    e.preventDefault();
    axios
      .post("register", userData)
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((e) => console.log(e));
  }
  return (
    <>
      <span className="circle-register-1"></span>
      <span className="circle-register-2"></span>
      <span className="circle-register-3"></span>
      <span className="circle-register-4"></span>
      <p className="txt-logo-register">EQ</p>
      <div className="div-register" style={{ color: "#DC2F02" }}>
        <h3>Registracija</h3>
        <form className="form-register" onSubmit={handleRegister}>
          <input
            className="input-name-register"
            type="name"
            required
            name="ime"
            onInput={handleInput}
          />
          <p className="txt-register">Ime</p>
          <input
            className="input-last-name-register"
            type="lastname"
            required
            name="prezime"
            onInput={handleInput}
          />
          <p className="txt-register">Prezime</p>
          <input
            className="input-username-register"
            type="username"
            required
            name="korisnicko_ime"
            onInput={handleInput}
          />
          <p className="txt-register">Korisničko ime</p>
          <div className="row">
            <div className="col-md-6">
              <select
                name="naziv_jezika"
                id="naziv_jezika"
                className="select-language"
                required
                onChange={handleInput}
              >
                <option value="nemacki" disabled selected hidden></option>
                <option value="Nemački">Nemački</option>
              </select>
              <p className="txt-register">Jezik</p>
            </div>
            <div className="col-md-6">
              <select
                name="nivo"
                id="nivo"
                className="select-language"
                required
                onChange={handleInput}
              >
                <option value="A1.1" disabled selected hidden></option>
                <option value="A1.1">A1.1</option>
              </select>
              <p className="txt-register">Nivo</p>
            </div>
          </div>
          <input
            className="input-password-register"
            type="password"
            required
            onInput={handleInput}
            name="password"
          />
          <p className="txt-register">Lozinka</p>
          <button className="btn-register" type="submit">
            Registruj se
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
