// src/SimpleModal.js
import React, { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PaymentBox from "./PaymentBox";

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

const PaymentModal = ({ setOpenCard }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
        <Box
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-4"
        >
          <PaymentBox setOpen={setOpen} />
        </Box>
      </Modal>
    </div>
  );
};

export default PaymentModal;
