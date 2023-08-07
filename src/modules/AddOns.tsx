import Nav from "../components/Nav";
import useCheckout from "../store/useCheckout";
import { BILLING } from "../types";
import config from "../utils/config";

export default function AddOns() {
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
        Pick add-ons
      </h1>
      <p className="text-neutral-cool text-base lg:text-2xl mt-3 lg:mt-6 mb-6 lg:mb-14">
        Add-ons help enhance your gaming experience
      </p>

      <div className="grid gap-8">
        {config.addons.map((addon) => (
          <div
            key={addon.name}
            onClick={() => updateData("addons", addon.name)}
            className={`${
              data.addons.includes(addon.name)
                ? "bg-neutral-alabaster outline-primary-purple"
                : ""
            } hover:shadow-custom cursor-pointer outline outline-neutral-light outline-2 rounded-2xl p-4 lg:py-8 lg:px-6 flex justify-between items-center`}
          >
            <div className="flex items-center gap-9">
              <input
                type="checkbox"
                name="addon"
                id={addon.name}
                className="w-6 h-6 checked:bg-primary-marine accent-primary-purplish cursor-pointer"
                checked={data.addons.includes(addon.name)}
              />
              <div>
                <p className="font-bold first-letter:capitalize text-sm lg:text-xl text-primary-marine">
                  {addon.name}
                </p>
                <p className="first-letter:capitalize text-sm lg:text-xl text-neutral-cool">
                  {addon.desc}
                </p>
              </div>
            </div>
            <p className="mt-1 lg:mt-[6px] text-base lg:text-xl text-primary-purplish">
              {config.currencySymbol}
              {data.billing === BILLING.MONTHLY
                ? addon.monthlyCost
                : addon.yearlyCost}
              /{data.billing === BILLING.MONTHLY ? "mo" : "yr"}
            </p>
          </div>
        ))}
      </div>

      <Nav />
    </form>
  );
}
