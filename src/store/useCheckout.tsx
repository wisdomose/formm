import { CheckoutContext } from "./checkout";
import { useContext } from "react";

export default function useCheckout() {
  const data = useContext(CheckoutContext);
  return data;
}
