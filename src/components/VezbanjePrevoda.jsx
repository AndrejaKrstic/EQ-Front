import React from "react";
//import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function VezbanjePrevoda({ level }) {
  var tacnoDugme = Math.floor(Math.random() * (5 - 1) + 1);
  let navigate = useNavigate();
  const [practiseData, setPractiseData] = useState({
    naziv_vezbanja: "Vežbanje prevoda",
    nivo_vezbanja: level,
    tacno: 0,
    netacno: 0,
  });
  const notify = () => toast("Niste gotovi sa vežbom!");
  document.body.style.overflowY = "hidden";
  let tacno = 0;
  let netacno = 0;
  let i = 1;

  const [words, setWords] = useState();
  useEffect(() => {
    if (words == null) {
      var config = {
        method: "get",
        url: "words/" + level,
        headers: {
          Authorization:
            "Bearer " + window.sessionStorage.getItem("auth_token"),
        },
      };
      axios(config).then((res) => {
        setWords(res.data.words);
        console.log("dakaka");
      });
    }
  }, [words]);
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  useEffect(() => {
    if (words != null) {
      shuffleArray(words);
      var vrstaReci = words[0].vrsta_reci;
      document.getElementById("btn-prevod-" + tacnoDugme).innerHTML =
        words[0].prevod;
      document.getElementById("rec-vezbanje-prevoda").innerHTML = words[0].rec;
      let y = 1;
      for (let z = 0; z < words.length; z++) {
        if (
          words[z].vrsta_reci == vrstaReci &&
          words[z].rec != words[0].rec &&
          tacnoDugme != y &&
          y < 6
        ) {
          document.getElementById("btn-prevod-" + y).innerHTML =
            words[z].prevod;
          console.log(y);
          y++;
        } else if (y == tacnoDugme) {
          y++;
        }
      }
      for (let z = 0; z < words.length; z++) {
        if (
          words[z].vrsta_reci != vrstaReci &&
          words[z].rec != words[i - 1].rec &&
          tacnoDugme != y &&
          y < 6
        ) {
          document.getElementById("btn-prevod-" + y).innerHTML =
            words[z].prevod;
          y++;
        } else if (y == tacnoDugme) {
          y++;
        }
      }
    }
  });

  function handleChoice(e) {
    if (words != null) {
      if (i < words.length) {
        if (words[i - 1].prevod == e.target.innerHTML) {
          console.log("masala brt moi");
          tacno++;
          i++;
          console.log("tacno: " + tacno);
          let width = document.getElementById("progress-bar-prevod").style
            .width;
          let newWidth = parseFloat(width) + 100 / words.length;
          document.getElementById("progress-bar-prevod").style.width =
            newWidth + "%";
          document.getElementById("progress-bar-prevod").innerHTML =
            i - 1 + "/" + words.length;

          ucitajSledeci();
        } else {
          document.getElementById("txt-tacan-prevod").innerHTML =
            words[i - 1].prevod;
          document.getElementById("txt-tacan-prevod").style.display = "block";

          console.log(words[i - 1].prevod);
          document.getElementById(
            "div-vezbanje-prevoda-buttons"
          ).style.display = "none";
          i++;
          setTimeout(function () {
            netacno++;
            let width = document.getElementById("progress-bar-prevod").style
              .width;
            let newWidth = parseFloat(width) + 100 / words.length;
            document.getElementById("progress-bar-prevod").style.width =
              newWidth + "%";
            document.getElementById("progress-bar-prevod").innerHTML =
              i - 1 + "/" + words.length;

            ucitajSledeci();
            document.getElementById("txt-tacan-prevod").style.display = "none";
            document.getElementById(
              "div-vezbanje-prevoda-buttons"
            ).style.display = "block";
          }, 1400);
        }
      } else {
        if (words[i - 1].prevod == e.target.innerHTML) {
          tacno++;
        } else {
          netacno++;
        }
        console.log("kraj");
        document.getElementById("progress-bar-prevod").innerHTML =
          i + "/" + words.length;
        document.getElementById("progress-bar-prevod").style.width = 100 + "%";
        document.getElementById("div-vezbanje-prevoda-buttons").style.display =
          "none";
        document.getElementById("rec-vezbanje-prevoda").innerHTML = "KRAJ";
      }
    }
  }
  function ucitajSledeci() {
    document.getElementById("rec-vezbanje-prevoda").innerHTML =
      words[i - 1].rec;
    setujDugmad(words[i - 1].vrsta_reci);
  }
  function setujDugmad(vrsta) {
    let tacnoDugme2 = Math.floor(Math.random() * (5 - 1) + 1);
    document.getElementById("btn-prevod-" + tacnoDugme2).innerHTML =
      words[i - 1].prevod;
    let y = 1;
    for (let z = 0; z < words.length; z++) {
      if (
        words[z].vrsta_reci == vrsta &&
        words[z].rec != words[i - 1].rec &&
        tacnoDugme2 != y &&
        y < 6
      ) {
        document.getElementById("btn-prevod-" + y).innerHTML = words[z].prevod;
        y++;
        console.log(words[z].vrsta_reci + " " + vrsta);
      } else if (y == tacnoDugme2) {
        y++;
      }
    }
    for (let z = 0; z < words.length; z++) {
      if (
        words[z].vrsta_reci != vrsta &&
        words[z].rec != words[i - 1].rec &&
        tacnoDugme2 != y &&
        y < 6
      ) {
        document.getElementById("btn-prevod-" + y).innerHTML = words[z].prevod;
        y++;
        console.log(words[z].vrsta_reci + " " + vrsta);
      } else if (y == tacnoDugme2) {
        y++;
      }
    }
  }

  function handleExit(e) {
    console.log(tacno + netacno);
    if (tacno + netacno < words.length) {
      notify();
    } else {
      practiseData.tacno = tacno;
      practiseData.netacno = netacno;
      console.log(practiseData);
      var config = {
        method: "post",
        url: "vezbanje",
        headers: {
          Authorization:
            "Bearer " + window.sessionStorage.getItem("auth_token"),
        },
        data: practiseData,
      };
      axios(config).then((res) => {
        console.log(res.data);
      });
      navigate("/");
    }
  }
  return (
    <>
      <div className="div-vezbanje-prevoda" id="div-vezbanje-prevoda">
        <p className="txt-vezbanje-prevoda">Vezbanje prevoda nivo {level}</p>
        <div
          className="div-zadatak-vezbanje-prevoda"
          id="div-zadatak-vezbanje-prevoda"
        >
          <h3 className="rec-vezbanje-prevoda" id="rec-vezbanje-prevoda"></h3>
          <h3 className="txt-tacan-prevod" id="txt-tacan-prevod">
            asdf
          </h3>
          <div
            className="div-vezbanje-prevoda-buttons"
            id="div-vezbanje-prevoda-buttons"
          >
            <button
              className="btn-prevod-1 btn-prevod"
              id="btn-prevod-1"
              onClick={(e) => handleChoice(e)}
            ></button>
            <button
              className="btn-prevod-2 btn-prevod"
              id="btn-prevod-2"
              onClick={(e) => handleChoice(e)}
            ></button>
            <button
              className="btn-prevod-3 btn-prevod"
              id="btn-prevod-3"
              onClick={(e) => handleChoice(e)}
            ></button>
            <button
              className="btn-prevod-4 btn-prevod"
              id="btn-prevod-4"
              onClick={(e) => handleChoice(e)}
            ></button>
            <button
              className="btn-prevod-5 btn-prevod"
              id="btn-prevod-5"
              onClick={(e) => handleChoice(e)}
            ></button>
          </div>
        </div>
      </div>
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped"
          role="progressbar"
          style={{ width: 0 + "%" }}
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
          id="progress-bar-prevod"
        ></div>
      </div>
      <div className="div-exit-vezbanje-prevod">
        <button onClick={handleExit} className="button-exit-vezbanje-prevod">
          IZLAZ
        </button>
      </div>
      <ToastContainer />
    </>
  );
}

export default VezbanjePrevoda;
