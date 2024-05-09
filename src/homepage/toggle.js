import Switch from "@mui/material/Switch";
import { FormControlLabel } from "@mui/material";
import { useState } from "react";

const Toggle = (props) => {
  const [hideCompleted, setHideCompleted] = useState(false);
  return (
    <FormControlLabel
      className={props.className}
      label="Remember Me"
      control={
        <Switch
          onChange={(ev) => {
            setHideCompleted(ev.target.checked);
          }}
          checked={hideCompleted}
          name="Save Model"
        />
      }
    />
  );
};

export default Toggle;
