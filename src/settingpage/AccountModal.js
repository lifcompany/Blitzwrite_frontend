// src/SimpleModal.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Modal,
  TextField,
  Grid,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  FormLabel,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import visaLogo from "../../src/assets/visa.png"; // Add your card images in assets
import mastercardLogo from "../../src/assets/mastercard.png";
import jcbLogo from "../../src/assets/amex.png";
import amexLogo from "../../src/assets/jcb.png";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const schema = yup.object().shape({
  cardNumber: yup
    .string()
    .matches(/^[0-9]{16}$/, "Card number must be 16 digits")
    .required("Card number is required"),
  expiryDate: yup
    .string()
    .matches(
      /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      "Expiry date must be in MM/YY format"
    )
    .required("Expiry date is required"),
  cvv: yup
    .string()
    .matches(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits")
    .required("CVV is required"),
  cardHolderName: yup.string().required("Card holder name is required"),
});

const AccountModal = (props) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const editversionID = props.editversionID;
  const [open, setOpen] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [modelName, setModelName] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [parameters, setParameters] = useState("");
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [checkedItems, setCheckedItems] = useState({
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false,
  });

  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = async () => {
    console.log(checkedItems);
    try {
      const response = await axios.post(
        "https://your-backend-api.com/submit",
        checkedItems
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const version_data = {
    display_name: displayName,
    model_name: modelName,
    endpoint: endpoint,
    params: parameters,
    editversionID: editversionID,
  };

  const add_new_version = () => {
    if (version_data.display_name === "" || version_data.model_name === "") {
      console.log("Display name and model name must be provided.");
      return;
    } else {
      axios
        .post(`${apiUrl}/add_new_version`, version_data)
        .then((response) => {
          props.setIsTriggered();
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  // useEffect(() => {
  //   console.log("ddd:", editversionID);
  //   axios
  //     .post(`${apiUrl}/get_edit_version`, {
  //       editversionID: editversionID,
  //     })
  //     .then((response) => {
  //       setDisplayName(response.data["display_name"]);
  //       setModelName(response.data["model_name"]);
  //       setEndpoint(response.data["endpoint"]);
  //       setParameters(response.data["params"]);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       setDisplayName("");
  //       setModelName("");
  //       setEndpoint("");
  //       setParameters("");
  //     });
  // }, [editversionID]);

  return (
    <div className="pt-2">
      <Button
        variant="contained"
        onClick={() => handleOpen()}
        sx={{
          backgroundColor: "#0F1740",
          color: "white",
          fontWeight: "bold",
          paddingY: 2,
          paddingLeft: 4,
          paddingRight: 4,
          borderRadius: "lg",
          "&:hover": {
            backgroundColor: "#22294e",
          },
          "&:focus": {
            outline: "none",
            backgroundColor: "#0e1225",
          },
        }}
      >
        サービスの退会
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <h1 className=" heading font text-[calc(8px+2vmin)] font-semibold mb-8">
            サービスの退会
          </h1>
          <h2 className=" heading font text-[calc(2vmin)] font-semibold mb-5">
            サービスを退会するとデータが消えてしまいます。
          </h2>
          <h2 className=" heading font mb-5">退会理由を教えてください</h2>
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.item1}
                    onChange={handleChange}
                    name="item1"
                  />
                }
                label="サービスを使わなくなった"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.item2}
                    onChange={handleChange}
                    name="item2"
                  />
                }
                label="機能やUIが使いにくい"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.item3}
                    onChange={handleChange}
                    name="item3"
                  />
                }
                label="料金が見合わない"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.item4}
                    onChange={handleChange}
                    name="item4"
                  />
                }
                label="コンテンツの質が低い"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.item5}
                    onChange={handleChange}
                    name="item5"
                  />
                }
                label="その他"
              />
            </FormGroup>
            <FormLabel component="legend">複数回答可能</FormLabel>
          </FormControl>

          <div className="flex justify-end items-center gap-5 mt-5">
            <div className="flex items-center justify-between">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="w-full py-2"
                onClick={handleSubmit}
              >
                退会する
              </Button>
            </div>
            <button
              className=" text-blue-500 roundedtransition"
              onClick={() => navigate("/")}
            >
              キャンセル
            </button>
          </div>
          {/* </form> */}
        </Box>
      </Modal>
    </div>
  );
};

export default AccountModal;
