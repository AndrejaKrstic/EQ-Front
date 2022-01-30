import React from "react";
//import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

function ProgressItem({ progress }) {
  let uspesnost = (progress.tacno / (progress.tacno + progress.netacno)) * 100;
  let ukupno = progress.tacno + progress.netacno;
  let procenat = Math.round(uspesnost);
  return (
    <>
      <div className="div-single-progress">
        <div className="div-naziv-vezbanja">
          <p className="txt-naziv-vezbanja">
            <span className="txt-progres-nazivi">Naziv vežbanja:</span>{" "}
            {progress.naziv_vezbanja} <br />
            <span className="txt-progres-nazivi">Nivo vežbanja: </span>
            {progress.nivo_vezbanja} <br />
            <span className="txt-progres-nazivi">Datum vežbanja: </span>
            {progress.datum_vezbanja}
          </p>
        </div>
        <div className="div-progress-vezbanje">
          <CircularProgress variant="determinate" value={uspesnost} />
          <p className="txt-odnos-odgovora">{procenat}%</p>
        </div>
      </div>
    </>
  );
}

export default ProgressItem;
