
"use client"
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
// import dynamic from 'next/dynamic';
import { z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

//Zod validation 
const formValuesSchema = z.object({ 
  name: z.string().nonempty("Email is required").min(6, 'name invalid'),
  email: z.string().email("Email is required").min(6, 'email invalid'),
})

//Using Zod schema as type
type FormDatatype = z.infer<typeof formValuesSchema>;

//Main function 
export default function Home() {

const [Logged, setLogged] = useState(false);

//Bringing all the validation to the form 
const form = useForm<FormDatatype>({ resolver: zodResolver(formValuesSchema) });

//Destructuring Form to get individual props
const {register, handleSubmit, formState} = form;
const {errors} = formState;

// OnSubmit function that later will be used on the form
const onSubmit: SubmitHandler<FormDatatype> = (data) => {
  console.log("Working!!!", data.name, data.email);   
  setLogged(true);
}

return (
<section className='bg-red-500 h-[100vh] flex flex-col items-center text-[2em] '>
  <div>
    <p>Welcome</p>
  </div>
{  Logged === false ? <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-[400px]  ' noValidate>

    {/* First Input */}
    <label htmlFor="name">name</label>
    <input 
    type="text" id="name" 
    {...register("name")}/>
       {errors.name && <p className='text-[yellow]'>{errors.name.message}</p>}


    {/* Second Input */}
    <label htmlFor="email">Email</label>
    <input type="text" id="email" {...register("email")}/>
    {errors.email && <p className='text-[yellow]'>{errors.email.message}</p>}


    {/* Submit button */}
    <button type="submit">Click me</button>

  </form>: <p className='text-[white] mt-40'>Well done!</p>
  
  }

  </section>

  );
}
