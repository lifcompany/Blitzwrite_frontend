// src/SimpleModal.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Modal,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  FormLabel,
} from "@mui/material";
import axios from "axios";
import Notification from "../component/common/notification";
import Error from "../component/common/error";



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


const AccountModal = (props) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const email = props.email;
  const error_status = props.error;
  const [open, setOpen] = useState(false)
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleOpen = () => {
    console.log(email, error_status);
    if (email !== "" && error_status==false) {
      setOpen(true);
    } else {
      console.log("ok");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [checkedItems, setCheckedItems] = useState({
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false,
  });

  useEffect(() => {
    if (email === "" || error_status === true) {
    } else {
    }
  }, [email]);

  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = async () => {
    setError(null);
    const token = localStorage.getItem("accessToken");
    console.log(checkedItems);

    try {
      const response = await axios.post(
        `${apiUrl}/api/authentication/delete_account/`,
        {
          email: email,
          checkItems: checkedItems
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          }
        }
      );
      console.log("Response:", response.data);
      localStorage.removeItem('accessToken');
      navigate('/')
    } catch (error) {
      console.error("Error submitting data:", error.response.data.error);
      setError(error.response.data.error);
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
              onClick={() => handleClose()}
            >
              キャンセル
            </button>
          </div>
        </Box>
      </Modal>
      <Notification content={notification} />
      <Error content={error} />
    </div>
  );
};

export default AccountModal;
