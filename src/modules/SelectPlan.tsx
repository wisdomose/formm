import Nav from "../components/Nav";
import useCheckout from "../store/useCheckout";
import { BILLING } from "../types";
import config from "../utils/config";

export default function SelectPlan() {
  const { updateData, updateStep, data } = useCheckout();

  function submitHandler() {
    updateStep();
  }
  return (
    <form
      className="max-w-[700px] max-lg:-mt-[73px] max-lg:shadow-custom w-full lg:w-[70%] bg-white max-lg:px-6 max-lg:py-8 max-lg:rounded-xl"
      onSubmit={(e) => {
        e.preventDefault();
        submitHandler();
      }}
    >
      <h1 className="font-bold text-2xl lg:text-5xl text-primary-marine">
        Select your plan
      </h1>
      <p className="text-neutral-cool text-base lg:text-2xl mt-3 lg:mt-6 mb-6 lg:mb-14">
        You have the option of monthly and yearly billing.
      </p>

      <div className="grid xl:grid-cols-3 gap-7">
        {config.plans.map((plan) => (
          <button
            type="button"
            onClick={() => updateData("plan", plan.name)}
            className={`${
              data.plan === plan.name
                ? "bg-neutral-alabaster outline-primary-purple"
                : ""
            } hover:shadow-custom hover:-translate-y-1 ease-in-out duration-300 hover:scale-110 cursor-pointer outline outline-neutral-light outline-2 rounded-2xl p-4 lg:py-8 lg:px-6 max-xl:flex max-xl:gap-4`}
          >
            <img
              src={plan.img}
              alt={plan.name}
              className="w-10 h-10 lg:w-14 lg:h-14"
            />

            <div className="text-left xl:mt-16">
              <p className="text-base lg:text-2xl text-primary-marine font-medium capitalize">
                {plan.name}
              </p>
              <p className="mt-1 lg:mt-[6px] text-base lg:text-xl text-neutral-cool">
                {config.currencySymbol}
                {data.billing === BILLING.MONTHLY
                  ? plan.monthlyCost
                  : plan.yearlyCost}
                /{data.billing === BILLING.MONTHLY ? "mo" : "yr"}
              </p>
              {data.billing === BILLING["YEARLY"] && (
                <p className="text-primary-marine text-sm lg:text-lg mt-1 lg:mt-2">
                  2 months free
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* toggle */}
      <div className="flex justify-center items-center mt-12 py-5 bg-neutral-alabaster gap-9 rounded-xl">
        <p className="text-xl text-primary-marine font-medium capitalize">
          Monthly
        </p>
        <div className="bg-primary-marine rounded-full p-[6px] w-[57px] h-[30px] relative">
          <button
            type="button"
            onClick={() =>
              updateData(
                "billing",
                data.billing === BILLING.MONTHLY
                  ? BILLING.YEARLY
                  : BILLING.MONTHLY
              )
            }
            className={`h-[18px] w-[18px] rounded-full bg-neutral-white absolute top-[6px] hover:scale-110  ${
              data.billing === BILLING.MONTHLY ? "left-[6px]" : "right-[6px]"
            }`}
          ></button>
        </div>
        <p className="text-xl text-neutral-cool font-medium capitalize">
          Yearly
        </p>
      </div>

      <Nav />
    </form>
  );
}
