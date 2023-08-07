import useCheckout from "../store/useCheckout";

export default function Nav() {
  const { updateStep, step } = useCheckout();
  return (
    <div
      className={`flex items-center md:mt-32 max-md:fixed max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:w-full max-md:bg-white max-md:p-4 ${
        step === 1 ? "justify-end" : "justify-between"
      }`}
    >
      {step > 1 && (
        <button
          type="button"
          onClick={() => updateStep(step - 1)}
          className="font-medium text-base lg:text-xl text-neutral-cool hover:text-primary-marine focus:text-primary-marine"
        >
          Go back
        </button>
      )}
      <button
        type="submit"
        className="font-medium text-base lg:text-xl bg-primary-marine hover:bg-primary-purplish focus:bg-primary-purplish text-neutral-white px-4 py-3 lg:px-10 lg:pt-5 lg:pb-5 rounded lg:rounded-xl"
      >
        Next Step
      </button>
    </div>
  );
}
