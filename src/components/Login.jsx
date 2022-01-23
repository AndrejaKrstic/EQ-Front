function Login() {
  document.body.style.overflowY = "hidden";
  return (
    <>
      <span className="circle-login-1"></span>
      <span className="circle-login-2"></span>
      <span className="circle-login-3"></span>
      <span className="circle-login-4"></span>
      <p className="txt-logo-login">EQ</p>
      <div className="div-login" style={{ color: "#0077B6" }}>
        <h3>Login</h3>
        <form className="form-login">
          <input className="input-username-login" type="text" />
          <p className="txt-login">Korisničko ime</p>
          <input className="input-password-login" type="password" />
          <p className="txt-login">Lozinka</p>
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
