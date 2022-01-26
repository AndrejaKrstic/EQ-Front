import React from "react";
import ProgressItem from "./ProgressItem";
import axios from "axios";
import { useState, useEffect } from "react";

function Progress() {
  document.body.style.overflowY = "auto";
  const [progressList, setProgressList] = useState();
  useEffect(() => {
    if (progressList == null) {
      var config = {
        method: "get",
        url: "napredak/" + window.sessionStorage.getItem("id"),
        headers: {
          Authorization:
            "Bearer " + window.sessionStorage.getItem("auth_token"),
        },
      };
      axios(config).then((res) => {
        setProgressList(res.data.practices);
      });
    }
  }, [progressList]);
  console.log(progressList);
  return (
    <>
      <div className="div-progress">
        {progressList == null ? (
          <>
            <div>
              <h3>Nema istorije vežbanja</h3>
            </div>
          </>
        ) : (
          progressList.map((progress) => (
            <ProgressItem progress={progress} key={progress.id} />
          ))
        )}
      </div>
    </>
  );
}

export default Progress;
