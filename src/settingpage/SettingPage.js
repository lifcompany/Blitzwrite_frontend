import _ from "lodash";
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import "./CustomSelect.css";
import Header from "../component/header";
import CurrentVersion from "./CurrentVersion";
import EditVersion from "./EditVersion";

const CustomSelect = () => {
  const [editversionID, setEditVersionID] = useState("");
  const [isTriggered, setIsTriggered] = useState(false);

  const handleTrigger = () => {
    setIsTriggered(!isTriggered);
  };

  useEffect(() => {
    const element = document.getElementById("observableElement");
    const resizeObserver = new ResizeObserver(
      _.debounce((entries) => {
        for (let entry of entries) {
          console.log(
            "Size changed:",
            entry.contentRect.width,
            "x",
            entry.contentRect.height
          );
        }
      }, 100)
    );

    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="flex flex-col" id="observableElement">
      <Header />
      <Grid
        container
        spacing={3}
        sx={{ mt: 0 }}
        className="bg-[#F1F5F9] py-14 px-28 flex-grow mt-0"
      >
        <Grid item sm={12} md={6}>
          <CurrentVersion
            seteditversionID={setEditVersionID}
            isTriggered={isTriggered}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <EditVersion
            editversionID={editversionID}
            setIsTriggered={handleTrigger}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CustomSelect;
