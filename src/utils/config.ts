import { ADDONS, PLAN } from "../types";

const config = {
  currency: "USD",
  currencySymbol: "$",
  steps: ["YOUR INFO", "SELECT PLAN", "ADD-ONS", "SUMMARY"],
  plans: [
    {
      name: PLAN["ARCADE"],
      monthlyCost: 9,
      yearlyCost: 90,
      img: "/images/icon-arcade.svg",
    },
    {
      name: PLAN["ADVANCED"],
      monthlyCost: 12,
      yearlyCost: 120,
      img: "/images/icon-advanced.svg",
    },
    {
      name: PLAN["PRO"],
      monthlyCost: 15,
      yearlyCost: 150,
      img: "/images/icon-pro.svg",
    },
  ],

  addons: [
    {
      name: ADDONS["ONLINE_SERVICE"],
      desc: "Access to multiplayer games",
      monthlyCost: 1,
      yearlyCost: 10,
    },
    {
      name: ADDONS["LARGER_STORAGE"],
      desc: "Extra 1TB of cloud save",
      monthlyCost: 2,
      yearlyCost: 20,
    },
    {
      name: ADDONS["CUSTOMIZABLE_PROFILE"],
      desc: "Custom theme on your profile",
      monthlyCost: 2,
      yearlyCost: 20,
    },
  ],
};

export default Object.freeze(config);
