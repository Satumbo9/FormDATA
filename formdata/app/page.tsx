"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//Zod validation
const formValuesSchema = z.object({
  name: z.string().min(6, "name invalid"),
  email: z.string().min(6, "email invalid"),
});

//Using Zod schema as type
type FormDatatype = z.infer<typeof formValuesSchema>;

//Main function
export default function Home() {
  const [Logged, setLogged] = useState(false);

  //Bringing all the validation to the form
  const form = useForm<FormDatatype>({
    resolver: zodResolver(formValuesSchema),
  });

  //Destructuring Form to get individual props
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  // OnSubmit function that later will be used on the form
  const onSubmit: SubmitHandler<FormDatatype> = (data) => {
    console.log("Working!!!", data.name, data.email);
    setLogged(true);
  };

  return (
    <section className="bg-red-500 h-[100vh] flex flex-col items-center justify-center text-[2em] ">
      <div>
        <p className=" text-[2em] font-bold text-[white]">FormValidation</p>
      </div>
      {Logged === false ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-[400px]   "
        >
          {/* First Input */}
          <div className="h-[150px]">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="w-full text-[0.70em] p-2"
              {...register("name")}
              placeholder="ig. John"
            />
            {errors.name && (
              <p className="text-[yellow] text-[0.80em]">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Second Input */}
          <div className="h-[150px] ">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              {...register("email")}
              className="w-full text-[0.70em] p-2"
              placeholder=" john@example.com"
            />
            {errors.email && (
              <p className="text-[yellow] text-[0.80em]">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button className=" bg-[yellow] font-bold" type="submit">
            Click me
          </button>
        </form>
      ) : (
        <p className="text-[white] mt-40  border-zinc-950">Well done!</p>
      )}
    </section>
  );
}
