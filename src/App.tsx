import useCheckout from "./store/useCheckout";
import YourInfo from "./modules/YourInfo";
import SelectPlan from "./modules/SelectPlan";
import AddOns from "./modules/AddOns";
import Summary from "./modules/Summary";
import Menu from "./modules/Menu";

function App() {
  const { step } = useCheckout();

  return (
    <div className="lg:grid lg:grid-cols-[400px,1fr] max-w-max mx-auto max-lg:bg-neutral-magnolia">
      {/* side menu */}
      <div className="lg:sticky lg:top-0 lg:left-0 lg:max-h-screen lg:h-screen lg:overflow-hidden lg:p-6 lg:pr-0">
        <Menu />
      </div>

      {/* content */}
      <div className="lg:p-6 lg:pl-0 min-h-screen">
        <div className="flex justify-center lg:py-14 max-lg:px-4 h-full">
          {step === 1 && <YourInfo />}
          {step === 2 && <SelectPlan />}
          {step === 3 && <AddOns />}
          {step === 4 && <Summary />}
        </div>
      </div>
    </div>
  );
}

export default App;
