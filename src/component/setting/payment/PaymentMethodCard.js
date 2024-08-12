import { Button } from "@mui/material";

export default function PaymentMethodCard({
  paymentMethod,
  deletePaymentMethod,
}) {
  return (
    <div className="grid mx-2 mt-8 mb-12 grid-cols-4 gap-4">
      <div className="flex w-full justify-between">
        <div>
          <p className="font-light">***** {paymentMethod.last4}</p>
          <p className="font-light font-noto-sans-jp">
            有効期限 {paymentMethod.exp_month}/{paymentMethod.exp_year}
          </p>
        </div>
        <Button
          color="error"
          className="font-noto-sans-jp"
          onClick={() => deletePaymentMethod()}
        >
          削除
        </Button>
      </div>
    </div>
  );
}
