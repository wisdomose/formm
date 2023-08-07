import useCheckout from "../store/useCheckout";
import { BILLING } from "../types";
import config from "../utils/config";
import { useEffect, useState } from "react";

export default function Summary() {
  const { updateStep, step, data } = useCheckout();
  const [confirmed, setConfirmed] = useState(false);

  function total() {
    if (data.billing === BILLING.MONTHLY) {
      return (
        (config.plans.find((plan) => plan.name === data.plan)?.monthlyCost ??
          0) +
        config.addons
          .filter((addon) => data.addons.includes(addon.name))
          .reduce((a, b) => (a += b.monthlyCost), 0)
      );
    } else {
      return (
        (config.plans.find((plan) => plan.name === data.plan)?.yearlyCost ??
          0) +
        config.addons
          .filter((addon) => data.addons.includes(addon.name))
          .reduce((a, b) => (a += b.yearlyCost), 0)
      );
    }
  }

  const isMonthly = data.billing === BILLING.MONTHLY;

  if (confirmed) return <Congratulations />;

  return (
    <div className="max-w-[700px] max-lg:-mt-[73px] max-lg:shadow-custom w-full lg:w-[70%] bg-white max-lg:px-6 max-lg:py-8 max-lg:rounded-xl">
      <h1 className="font-bold text-2xl lg:text-5xl text-primary-marine">
        Finishing up
      </h1>
      <p className="text-neutral-cool text-base lg:text-2xl mt-3 lg:mt-6 mb-6 lg:mb-14">
        Double-check everything looks OK before confirming.
      </p>

      <div>
        <div className="rounded-xl bg-neutral-magnolia p-4 lg:py-7 lg:pb-10 lg:px-9">
          <div className="flex justify-between items-center pb-4 lg:pb-10">
            <div>
              <p className="first-letter:capitalize text-primary-marine font-medium text-base lg:text-2xl mb-1 lg:mb-2">
                {data.plan} ({isMonthly ? "Monthly" : "Yearly"})
              </p>
              <button
                onClick={() => updateStep(2)}
                className="underline text-neutral-cool text-base lg:text-xl"
              >
                Change
              </button>
            </div>
            <p className="text-primary-marine font-medium text-sm lg:text-2xl">
              {config.currencySymbol}
              {isMonthly
                ? config.plans.find((plan) => plan.name === data.plan)
                    ?.monthlyCost
                : config.plans.find((plan) => plan.name === data.plan)
                    ?.yearlyCost}
              /{isMonthly ? "mo" : "yr"}
            </p>
          </div>
          <div className="border-t border-neutral-light pt-4 lg:pt-7 flex flex-col gap-4 lg:gap-8">
            {data.addons.map((addon) => (
              <div
                key={addon}
                className="flex items-center justify-between w-full"
              >
                <p className="text-neutral-cool first-letter:capitalize text-sm lg:text-xl">
                  {addon}
                </p>
                <p className="text-primary-marine text-sm lg:text-xl">
                  +{config.currencySymbol}
                  {isMonthly
                    ? config.addons.find((add) => add.name === addon)
                        ?.monthlyCost
                    : config.addons.find((add) => add.name === addon)
                        ?.yearlyCost}
                  /{isMonthly ? "mo" : "yr"}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between w-full px-4 lg:px-9 pt-6 lg:pt-10">
          <p className="text-neutral-cool text-sm lg:text-xl">
            Total (per {isMonthly ? "month" : "year"})
          </p>
          <p className="text-primary-purplish font-medium text-base lg:text-3xl">
            +{config.currencySymbol}
            {total()}/{isMonthly ? "mo" : "yr"}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center md:mt-32 max-md:fixed max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:w-full max-md:bg-white max-md:p-4">
        <button
          type="button"
          onClick={() => updateStep(step - 1)}
          className="font-medium text-base lg:text-xl text-neutral-cool hover:text-primary-marine focus:text-primary-marine"
        >
          Go back
        </button>
        <button
          onClick={() => setConfirmed(true)}
          type="submit"
          className="font-medium text-base lg:text-xl bg-primary-purplish hover:bg-primary-marine focus:bg-primary-marine text-neutral-white px-4 py-3 lg:px-10 lg:pt-5 lg:pb-5 rounded lg:rounded-xl"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

function Congratulations() {
  const { reset } = useCheckout();
  useEffect(() => {
    const timeout = setTimeout(() => {
      reset();
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className="h-full flex items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center max-w-[700px] max-lg:-mt-[73px] max-lg:shadow-custom w-full lg:w-[70%] bg-white max-lg:px-6 max-lg:py-20 max-lg:rounded-xl">
        <img
          src="/images/icon-thank-you.svg"
          alt="thank you"
          className="h-14 w-14 lg:h-32 lg:w-32"
        />
        <h1 className="text-primary-marine text-2xl lg:text-5xl mt-6 lg:mt-12 mb-4 lg:mb-7 font-bold">
          Thank you!
        </h1>
        <p className="text-neutral-cool max-w-[35ch] lg:max-w-[60ch] text-center lg:text-2xl">
          Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at{" "}<a href="mailto:support@loremgaming.com" target="_blank">
            support@loremgaming.com
          </a>
        </p>
      </div>
    </div>
  );
}
