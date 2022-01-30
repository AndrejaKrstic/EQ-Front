import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const style = {
  color: "white",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#76c893",
  borderStyle: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: 10 + "px",
};

function MojNalog() {
  let navigate = useNavigate();
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function showPasswordChange() {
    if (
      document.getElementById("div-promena-lozinke").style.display == "block"
    ) {
      document.getElementById("div-promena-lozinke").style.display = "none";
    } else {
      document.getElementById("div-promena-lozinke").style.display = "block";
    }
  }
  function handleInput(e) {
    let newPasswordData = passwordData;
    newPasswordData[e.target.name] = e.target.value;
    setPasswordData(newPasswordData);
    console.log(passwordData);
  }
  function handlePasswordChange(e) {
    e.preventDefault();
    var config = {
      method: "post",
      url: "users/password",
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("auth_token"),
      },
      data: passwordData,
    };
    console.log(config);
    axios(config).then((res) => {
      console.log(res.data);
      if (res.data == "password succesfully changed!") {
        document.getElementById("txt-uspeh-promene").style.color = "green";
        document.getElementById("txt-uspeh-promene").style.display = "block";
        document.getElementById("txt-uspeh-promene").innerHTML =
          "Uspešno promenjena lozinka!";
        document.getElementById("div-promena-lozinke").style.display = "none";
        setTimeout(function () {
          document.getElementById("txt-uspeh-promene").style.display = "none";
        }, 3000);
      } else if (res.data == "old password is not correct!") {
        document.getElementById("txt-uspeh-promene").style.color = "red";
        document.getElementById("txt-uspeh-promene").style.display = "block";
        document.getElementById("txt-uspeh-promene").innerHTML =
          "Pogrešna stara lozinka!";
        setTimeout(function () {
          document.getElementById("txt-uspeh-promene").style.display = "none";
        }, 3000);
      }
    });
  }
  function handleAccountDelete() {
    var config = {
      method: "delete",
      url: "users/" + window.sessionStorage.getItem("id"),
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("auth_token"),
      },
    };
    axios(config).then(() => {
      window.sessionStorage.setItem("auth_token", null);
      window.sessionStorage.setItem("imePrezime", null);
      window.sessionStorage.setItem("id", null);
      navigate("/login");
    });
  }
  return (
    <>
      <div className="div-moj-nalog">
        <p className="txt-moj-nalog">Moj nalog</p>
        <button className="btn-promena-lozinke" onClick={showPasswordChange}>
          Promenite lozinku
        </button>
        <div className="div-promena-lozinke" id="div-promena-lozinke">
          <form action="submit" onSubmit={handlePasswordChange}>
            <input
              type="password"
              className="input-password-old"
              onInput={handleInput}
              name="oldPassword"
            />
            <p>Unesite staru lozinku</p>
            <input
              type="password"
              className="input-password-new"
              onInput={handleInput}
              name="newPassword"
            />
            <p>Unesite novu lozinku</p>
            <button className="btn-promena-lozinke-action">Promeni</button>
          </form>
        </div>
        <p className="txt-uspeh-promene" id="txt-uspeh-promene"></p>
        <br />
        <button className="btn-brisanje-naloga" onClick={handleOpen}>
          Obrišite nalog
        </button>
      </div>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Potvrda brisanja
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Da li želite da obrišete vaš nalog?
            </Typography>
            <Button onClick={handleAccountDelete}>Obriši</Button>
            <Button onClick={handleClose}>Odustani</Button>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default MojNalog;
