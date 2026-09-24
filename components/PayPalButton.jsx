'use client';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPalButton({ amount, onSuccess }) {
  return (
    <PayPalScriptProvider options={{ 
      "client-id": "AfQYrUFqcYCaLygF9lbWCQ9x8EDMKzLVd9WQBiAOAr_cw_mFnU3Pcj7WdeCHbpkL4gveOA10IYzhrvy7", // Hna ghadi t-hathi Client ID dyal PayPal Business dyalek
      currency: "USD",
      "enable-funding": "card" // Had-shi kay-smeh b paiement b Carte Bancaire (Visa/Mastercard)
    }}>
      <PayPalButtons
        style={{ layout: "vertical", shape: "rect" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount ? amount.toString() : "10.00",
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            alert("Paiement réussi ! Merci " + details.payer.name.given_name);
            if (onSuccess) onSuccess(details);
          });
        }}
      />
    </PayPalScriptProvider>
  );
}