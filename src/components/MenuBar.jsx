import React from "react";
import axios from "axios";
//import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function MenuBar({ token }) {
  //document.getElementById("vezbanje-drop-down").style.display = "";
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
    });
    navigate("/login");
    e.preventDefault();
  }
  return (
    <>
      <span className="circle-home-1"></span>
      <span className="circle-home-2"></span>
      <span className="circle-home-3"></span>
      <nav className="navbar navbar-expand-xl navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            EQ
          </a>
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
                    <a className="dropdown-item" href="#">
                      Vezbanje roda &gt;
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Vezbanje prevoda &gt;
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="item-napredak" aria-current="page" href="#">
                  Moj napredak
                </a>
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
  );
}

export default MenuBar;
