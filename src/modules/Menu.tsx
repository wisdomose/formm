import { useMemo } from "react";
import config from "../utils/config";

import useCheckout from "../store/useCheckout";

export default function Menu() {

    const { updateStep, step } = useCheckout();

    const isActiveStep = (value: number) => useMemo(() => value === step, [step]);
  
  return (
    <div className="h-full flex lg:flex-col max-lg:justify-center items-start gap-4 lg:gap-12 bg-[url('/bg-mobile.svg')] lg:bg-[url('/bg-desktop.svg')] bg-no-repeat bg-cover bg-bottom lg:rounded-2xl py-8 lg:py-14 lg:px-12 max-lg:h-40">
      {config.steps.map((value, index) => (
        <button
          key={value}
          onClick={() => updateStep(index + 1)}
          className="group flex items-center gap-9"
        >
          <div
            className={`${
              isActiveStep(index + 1)
                ? "bg-white"
                : "group-hover:bg-white group-focus:bg-white"
            } w-8 h-8 lg:w-14 lg:h-14 border-2 border-neutral-white rounded-full grid place-items-center`}
          >
            <p
              className={`text-sm lg:text-2xl ${
                isActiveStep(index + 1)
                  ? "text-primary-marine"
                  : "text-neutral-white group-hover:text-primary-marine group-focus:text-primary-marine"
              } `}
            >
              {index + 1}
            </p>
          </div>
          <div className="text-left text-white hidden lg:block">
            <p className="text-lg text-primary-pastel">STEP {index + 1}</p>
            <p className="text-2xl text-neutral-white font-bold">{value}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
