import Nav from "../components/Nav";
import useCheckout from "../store/useCheckout";
import { useState } from "react";

export default function YourInfo() {
  const { updateData, updateStep, data } = useCheckout();
  const [err, setErr] = useState<Record<string, string>>({});

  function submitHandler() {
    const err = updateStep();
    if (err) setErr(err);
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
        Personal info
      </h1>
      <p className="text-neutral-cool text-base lg:text-2xl mt-3 lg:mt-6 mb-6 lg:mb-14">
        Please provide your name, email address and phone number.
      </p>

      <div className="flex flex-col gap-1 lg:gap-3">
        <div className="flex justify-between items-center">
          <label
            htmlFor="name"
            className="font-medium text-sm lg:text-xl text-primary-marine"
          >
            Name
          </label>
          {err?.name && (
            <p className="text-sm lg:text-xl text-primary-strawberry">
              {err.name}
            </p>
          )}
        </div>
        <input
          type="text"
          id="name"
          className={`outline-2 outline rounded-xl p-4 lg:p-5 text-base lg:text-2xl font-medium text-primary-marine placeholder:text-base lg:placeholder:text-2xl placeholder:font-[400] ${
            err?.name
              ? "outline-primary-strawberry"
              : "outline-neutral-light focus:outline-primary-purplish"
          }`}
          placeholder="John Doe"
          value={data.name}
          onChange={(e) => {
            updateData("name", e.target.value);
          }}
        />
      </div>

      <div className="flex flex-col gap-1 lg:gap-3 my-4 lg:my-9">
        <div className="flex justify-between items-center">
          <label
            htmlFor="email"
            className="font-medium text-sm lg:text-xl text-primary-marine"
          >
            Email Address
          </label>

          {err?.email && (
            <p className="text-sm lg:text-xl text-primary-strawberry">
              {err.email}
            </p>
          )}
        </div>
        <input
          type="email"
          id="email"
          value={data?.email}
          className={`outline-2 outline rounded-xl p-4 lg:p-5 text-base lg:text-2xl font-medium text-primary-marine placeholder:text-base lg:placeholder:text-2xl placeholder:font-[400] ${
            err?.email
              ? "outline-primary-strawberry"
              : "outline-neutral-light focus:outline-primary-purplish"
          }`}
          placeholder="JohnDoe@email.com"
          onChange={(e) => updateData("email", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1 lg:gap-3">
        <div className="flex justify-between items-center">
          <label
            htmlFor="phone"
            className="font-medium text-sm lg:text-xl text-primary-marine"
          >
            Phone number
          </label>
          {err?.phone && (
            <p className="text-sm lg:text-xl text-primary-strawberry">
              {err.phone}
            </p>
          )}
        </div>
        <input
          type="text"
          id="phone"
          value={data?.phone}
          className={`outline-2 outline rounded-xl p-4 lg:p-5 text-base lg:text-2xl font-medium text-primary-marine placeholder:text-base lg:placeholder:text-2xl placeholder:font-[400] ${
            err?.phone
              ? "outline-primary-strawberry"
              : "outline-neutral-light focus:outline-primary-purplish"
          }`}
          placeholder="John Doe"
          onChange={(e) => updateData("phone", e.target.value)}
        />
      </div>

      <Nav />
    </form>
  );
}
