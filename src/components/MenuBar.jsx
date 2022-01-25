import React from "react";
import axios from "axios";
//import { Outlet } from "react-router-dom";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";

function MenuBar() {
  let navigate = useNavigate();
  function handleLogout(e) {
    var config = {
      method: "post",
      url: "logout",
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("auth_token"),
      },
    };
    axios(config).then((res) => {
      console.log(res.data);
      window.sessionStorage.setItem("auth_token", null);
      window.sessionStorage.setItem("imePrezime", null);
    });

    navigate("/login");
    e.preventDefault();
  }
  useEffect(() => {
    if (window.sessionStorage.getItem("auth_token") == "null") {
      navigate("/login");
    }
  });
  return (
    <>
      {window.sessionStorage.getItem("auth_token") == null ? (
        <Navigate to={"/login"} />
      ) : (
        <>
          <span className="circle-home-1"></span>
          <span className="circle-home-2"></span>
          <span className="circle-home-3"></span>
          <nav className="navbar navbar-expand-xl navbar-dark">
            <div className="container-fluid">
              <Link to="/" className="navbar-brand" href="/">
                EQ
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarWithDropdown"
                aria-controls="navbarWithDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon navbar-dark"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarWithDropdown">
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <a
                      className="dropdown-toggle"
                      href="#"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Vezbanje
                    </a>

                    <ul
                      style={{ backgroundColor: "#76c893" }}
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <li>
                        <Link
                          to="/izbor-nivoa"
                          className="dropdown-item"
                          href="/izbor-nivoa"
                        >
                          Vezbanje roda &gt;
                        </Link>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Vezbanje prevoda &gt;
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/moj-napredak"
                      className="item-napredak"
                      aria-current="page"
                      href="/moj-napredak"
                    >
                      Moj napredak
                    </Link>
                  </li>
                  <li className="nav-item dropdown name-item">
                    <a
                      className="dropdown-toggle name-link"
                      href="#"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {!window.sessionStorage.getItem("imePrezime") ? (
                        <></>
                      ) : (
                        window.sessionStorage.getItem("imePrezime")
                      )}
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                      style={{ backgroundColor: "#76c893" }}
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          Moj nalog
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          onClick={handleLogout}
                          href="/login"
                        >
                          Logout
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
}

export default MenuBar;
