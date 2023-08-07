import { ReactNode, createContext, useState, useCallback } from "react";
import { ADDONS, BILLING, PLAN } from "../types";
import { toast } from "react-toastify";
import { z } from "zod";

const initialState = {
  name: "",
  email: "",
  phone: "",
  plan: PLAN["ARCADE"],
  billing: BILLING["MONTHLY"],
  addons: [ADDONS["ONLINE_SERVICE"]],
};

const defaultData = {
  data: initialState,
  step: 1,
  reset: () => {},
  // @ts-ignore
  updateData: (key: keyof typeof initialState, value: any) => {},
  // @ts-ignore
  updateStep: (step?: number): any => {},
};

const validator = [
  z.object({
    name: z
      .string({ required_error: "Name is required" })
      .nonempty("Name cannot be empty"),
    email: z
      .string({ required_error: "Email is required" })
      .nonempty("Email cannot be empty")
      .email("Invalid email"),
    phone: z
      .string({ required_error: "Phone number is required" })
      .nonempty("Phone number cannot be empty"),
  }),
  z.object({
    plan: z
      .string({ required_error: "Select a plan" })
      .nonempty("Select a plan"),
    billing: z
      .string({ required_error: "Select a billing period" })
      .nonempty("Select a billing period"),
  }),
  z.object({
    addons: z
      .string({ required_error: "You need to select at least one addon" })
      .array()
      .min(1, "You need to select at least one addon"),
  }),
  z.object({}),
];

const noOfSteps = 4;

export const CheckoutContext = createContext(defaultData);

export default function CheckoutContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [data, setData] = useState(initialState);
  const [step, setStep] = useState(1);

  const updateData = (key: keyof typeof data, value: any) => {
    if (key === "addons") {
      setData((state) => {
        if (state.addons.includes(value)) {
          return {
            ...state,
            addons: [...state.addons.filter((addon) => addon !== value)],
          };
        } else {
          return {
            ...state,
            addons: [...state.addons, value],
          };
        }
      });
    } else setData((state) => ({ ...state, [key]: value }));
  };

  const updateStep = useCallback(
    (target?: number) => {
      if (target === step) return;
      try {
        if (target) {
          if (target > noOfSteps) throw new Error("An error occured");
          // if the target step is ahead the current step
          // make sure this current step is done and
          // the step before the target step is done
          if (target > step) {
            validator[step - 1].parse(data);
            if (target > 1) validator[target - 2].parse(data);
          }
        } else {
          if (step === noOfSteps) return;
          validator[step - 1].parse(data);
        }

        setStep((step) => (target ? target : step + 1));
        return;
      } catch (error: any) {
        let msg = error?.message;
        if (error?.issues) {
          const er = {};
          error?.issues.forEach((err: any) => {
            // @ts-ignore
            er[err.path[0]] = err.message;
          });
          msg = (error?.issues ?? [])[0].message;
          toast.error(msg);
          return er;
        }
      }
    },
    [step, data, validator]
  );

  function reset() {
    setData(initialState);
    setStep(1);
  }

  const value = {
    data,
    step,
    reset,
    updateStep,
    updateData,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
}
