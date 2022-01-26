import React from "react";
//import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function VezbanjeRoda({ level }) {
  let navigate = useNavigate();
  const [practiseData, setPractiseData] = useState({
    naziv_vezbanja: "Vežbanje roda",
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
    //ako reci nisu setovane, setuj
    if (words == null) {
      var config = {
        method: "get",
        url: "words/imenice/" + level,
        headers: {
          Authorization:
            "Bearer " + window.sessionStorage.getItem("auth_token"),
        },
      };
      axios(config).then((res) => {
        setWords(res.data.words);
        if (words != null) {
          document.getElementById("rec-vezbanje-roda").innerHTML = words[0].rec;
          console.log("da");
        }
      });
    }
  }, [words]);
  useEffect(() => {
    //ako reci nisu setovane, setuj
    if (words != null) {
      document.getElementById("rec-vezbanje-roda").innerHTML = words[0].rec;
      console.log("da");
    }
  }, [words]);
  console.log(words);

  function handleGender(gender) {
    if (words != null) {
      if (words[i - 1].rod == gender) {
        console.log("correct");
        if (i < words.length) {
          document.getElementById("rec-vezbanje-roda").innerHTML = words[i].rec;
          ++tacno;
        } else {
          ++tacno;
          console.log("kraj");
          document.getElementById("div-zadatak-vezbanje-roda").style.display =
            "none";
          console.log("correct: " + tacno + " incorrect: " + netacno);
        }
        i++;
        let width = document.getElementById("progress-bar-rod").style.width;
        let newWidth = parseFloat(width) + 100 / words.length;
        console.log(newWidth);
        document.getElementById("progress-bar-rod").style.width =
          newWidth + "%";
        document.getElementById("progress-bar-rod").innerHTML =
          i - 1 + "/" + words.length;
      } else {
        console.log("incorrect");
        document.getElementById("div-vezbanje-roda-buttons").style.display =
          "none";
        let word = words[i - 1].rod;
        document.getElementById("txt-tacan-rod").innerHTML = word;
        console.log(word);
        document.getElementById("txt-tacan-rod").style.display = "block";
        setTimeout(function () {
          if (i < words.length) {
            document.getElementById("rec-vezbanje-roda").innerHTML =
              words[i].rec;

            ++netacno;
          } else {
            console.log("kraj");
            ++netacno;
            document.getElementById("div-zadatak-vezbanje-roda").style.display =
              "none";
            console.log("correct: " + tacno + "incorrect: " + netacno);
          }
          i++;
          let width = document.getElementById("progress-bar-rod").style.width;
          let newWidth = parseFloat(width) + 100 / words.length;
          console.log(newWidth);
          document.getElementById("progress-bar-rod").style.width =
            newWidth + "%";
          document.getElementById("progress-bar-rod").innerHTML =
            i - 1 + "/" + words.length;
          document.getElementById("txt-tacan-rod").style.display = "none";
          document.getElementById("div-vezbanje-roda-buttons").style.display =
            "block";
        }, 1400);
      }
    }
  }

  function handleExit(e) {
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
      <div className="div-vezbanje-roda" id="div-vezbanje-roda">
        <p className="txt-vezbanje-roda">Vezbanje roda nivo {level}</p>
        <div
          className="div-zadatak-vezbanje-roda"
          id="div-zadatak-vezbanje-roda"
        >
          <h3 className="rec-vezbanje-roda" id="rec-vezbanje-roda"></h3>
          <h3 className="txt-tacan-rod" id="txt-tacan-rod">
            fasdf
          </h3>
          <div
            className="div-vezbanje-roda-buttons"
            id="div-vezbanje-roda-buttons"
          >
            <button
              className="btn-der btn-rod"
              onClick={() => handleGender("der")}
            >
              Der
            </button>
            <button
              className="btn-die btn-rod"
              onClick={() => handleGender("die")}
            >
              Die
            </button>
            <button
              className="btn-das btn-rod"
              onClick={() => handleGender("das")}
            >
              Das
            </button>
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
          id="progress-bar-rod"
        ></div>
      </div>
      <div className="div-exit-vezbanje-rod">
        <button onClick={handleExit} className="button-exit-vezbanje-rod">
          IZLAZ
        </button>
      </div>
      <ToastContainer />
    </>
  );
}

export default VezbanjeRoda;
