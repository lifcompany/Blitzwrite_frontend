import React, { useState } from 'react';
import {
  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  cardNumber: yup.string().required('カード番号を入力してください')
    .matches(/^[0-9]{16}$/, 'カード番号は16桁である必要があります'),
  cardName: yup.string().required('カード名義を入力してください'),
  expiry: yup.string().required('有効期限を入力してください')
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, '有効期限の形式はMM/YYです'),
  cvc: yup.string().required('セキュリティコードを入力してください')
    .matches(/^[0-9]{3,4}$/, 'セキュリティコードは3〜4桁である必要があります'),
});

const CreditCardForm = ({ open, handleClose }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>クレジットカードの登録</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            name="cardNumber"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="カード番号"
                fullWidth
                margin="normal"
                error={!!errors.cardNumber}
                helperText={errors.cardNumber ? errors.cardNumber.message : ''}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreditCardIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Controller
            name="cardName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="カード名義"
                fullWidth
                margin="normal"
                error={!!errors.cardName}
                helperText={errors.cardName ? errors.cardName.message : ''}
              />
            )}
          />
          <Controller
            name="expiry"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="有効期限"
                fullWidth
                margin="normal"
                placeholder="MM / YY"
                error={!!errors.expiry}
                helperText={errors.expiry ? errors.expiry.message : ''}
              />
            )}
          />
          <Controller
            name="cvc"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="セキュリティコード"
                fullWidth
                margin="normal"
                error={!!errors.cvc}
                helperText={errors.cvc ? errors.cvc.message : ''}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
          <Button type="submit" color="primary" variant="contained">
            追加
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreditCardForm;
