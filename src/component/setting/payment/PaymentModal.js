// src/SimpleModal.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Modal, TextField, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import PaymentBox from "./PaymentBox";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
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

const PaymentModal = (props) => {
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
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log({ modelName, endpoint, parameters });
  // };

  const version_data = {
    display_name: displayName,
    model_name: modelName,
    endpoint: endpoint,
    params: parameters,
    editversionID: editversionID,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await axios.post("/api/your-endpoint", data);
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
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
        支払い情報を登録
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          {/* <h2 className=" heading font text-[calc(2vmin)] font-semibold mt-10 mb-10">
            クレジットカードの登録
          </h2>
          <Box sx={{ display: "flex", justifyContent: "space-around", mb: 2 }}>
            <img src={visaLogo} alt="Visa" width="70" />
            <img src={mastercardLogo} alt="MasterCard" width="70" />
            <img src={jcbLogo} alt="JCB" width="70" />
            <img src={amexLogo} alt="Amex" width="70" />
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Controller
                name="cardNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="cardNumber"
                    label="カード番号"
                    placeholder="4242 **** **** **** ****"
                    // value={displayName}
                    className="flex w-full sm:w-256 mx-8 my-10"
                    inputProps={{
                      "aria-label": "Search",
                    }}
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    // onChange={(e) => setDisplayName(e.target.value)}
                    error={!!errors.cardNumber}
                    helperText={
                      errors.cardNumber ? errors.cardNumber.message : ""
                    }
                  />
                )}
              />
            </div>

            <div className="">
              <Controller
                name="cardHolderName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="name"
                    name="cardHolderName"
                    label="カード名義"
                    placeholder="カード名義"
                    variant="outlined"
                    // value={endpoint}
                    // onChange={(e) => setEndpoint(e.target.value)}
                    className="flex w-full sm:w-256 mx-8 my-10"
                    inputProps={{
                      "aria-label": "Search",
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={!!errors.cardHolderName}
                    helperText={
                      errors.cardHolderName ? errors.cardHolderName.message : ""
                    }
                  />
                )}
              />
            </div>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Controller
                  name="expiryDate"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      margin="normal"
                      label="有効期限 (MM/YY)"
                      variant="outlined"
                      error={!!errors.expiryDate}
                      helperText={
                        errors.expiryDate ? errors.expiryDate.message : ""
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="cvv"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      margin="normal"
                      label="セキュリティコード"
                      variant="outlined"
                      type="password"
                      error={!!errors.cvv}
                      helperText={errors.cvv ? errors.cvv.message : ""}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <div className="flex justify-end items-center gap-5">
              {editversionID ? (
                <div className="flex items-center justify-between">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="w-full py-2"
                    // onClick={add_new_version}
                  >
                    追加
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="w-300 py-2"
                    // onClick={add_new_version}
                  >
                    追加
                  </Button>
                </div>
              )}
              <button
                className=" text-blue-500 roundedtransition"
                onClick={() => navigate("/")}
              >
                キャンセル
              </button>
            </div>
          </form> */}
          <PaymentBox setOpen={setOpen} />
        </Box>
      </Modal>
    </div>
  );
};

export default PaymentModal;
