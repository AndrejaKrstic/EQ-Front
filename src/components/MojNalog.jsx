import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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
  function handleAccountDelete() {}
  return (
    <>
      <div className="div-moj-nalog">
        <p className="txt-moj-nalog">Moj nalog</p>
        <button className="btn-promena-lozinke" onClick={showPasswordChange}>
          Promenite lozinku
        </button>
        <div className="div-promena-lozinke" id="div-promena-lozinke">
          <form action="submit">
            <input type="password" className="input-password-old" />
            <p>Unesite staru lozinku</p>
            <input type="password" className="input-password-new" />
            <p>Unesite novu lozinku</p>
            <input type="password" className="input-password-new-repeat" />
            <p>Ponovite novu lozinku</p>
            <button className="btn-promena-lozinke-action">Promeni</button>
          </form>
        </div>
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
