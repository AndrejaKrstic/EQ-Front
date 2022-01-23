function Register() {
  return (
    <>
      <span className="circle-register-1"></span>
      <span className="circle-register-2"></span>
      <span className="circle-register-3"></span>
      <span className="circle-register-4"></span>
      <p className="txt-logo-register">EQ</p>
      <div className="div-register" style={{ color: "#DC2F02" }}>
        <h3>Registracija</h3>
        <form className="form-register">
          <input className="input-name-register" type="text" />
          <p className="txt-register">Ime</p>
          <input className="input-last-name-register" type="text" />
          <p className="txt-register">Prezime</p>
          <input className="input-username-register" type="text" />
          <p className="txt-register">Korisničko ime</p>
          <select name="Jezik" id="jezik" className="select-language">
            <option value="" disabled selected hidden></option>
            <option value="Nemački A1.1">Nemački (A1.1)</option>
          </select>
          <p className="txt-register">Jezik (nivo)</p>
          <input className="input-password-register" type="password" />
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
