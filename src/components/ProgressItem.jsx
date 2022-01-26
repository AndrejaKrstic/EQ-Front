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
            Naziv vežbanja: <br />
            <br />
            {progress.naziv_vezbanja}
          </p>
        </div>
        <div className="div-nivo-vezbanja">
          <p className="txt-nivo-vezbanja">
            Nivo vežbanja: <br />
            <br />
            {progress.nivo_vezbanja}
          </p>
        </div>
        <div className="div-progress-vezbanje">
          <CircularProgress variant="determinate" value={uspesnost} />
          <p className="txt-odnos-odgovora">{procenat}%</p>
        </div>
        {/* <div className="div-odnos-odgovora">
          <p className="txt-odnos-odgovora">{procenat}%</p>
        </div> */}
        <div className="div-datum-vezbanja">
          <p className="txt-datum-vezbanja">
            Datum vežbanja: <br />
            <br />
            {progress.datum_vezbanja}
          </p>
        </div>
      </div>
    </>
  );
}

export default ProgressItem;
