"use client"
import React from 'react'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {zodResolver} from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa'
import Link from 'next/link'
import { CgPassword } from 'react-icons/cg'

const signupSchema = z.object({
  name: z.string().min(2, "Name Should have atleast 2 characters.").max(50, "Name would not exceed 50 characters.").refine((value) => /^ [a-zA=Z]+[-'s]?[a-zA-Z]+$/.test(value), "Name should contain only alphabets."),
  email: z.string().email("Email must be valid."),
  password: z.string().min(6, "Password should have 6 characters."),
  confirmPassword: z.string().min(6, "Password should have atleast 6 characters.")
}).refine((data) => data.password === data.confirmPassword,{
  message: "password does not match.",
  path: ["confirmPassword"],
});

const Page = () => {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues : {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit(values: z.infer<typeof signupSchema>) {
    console.log(values)
  }

  return (
    <>
      <div className="signUpwrapper">
        <div className="formWrapper">
          <div className="left">
            <h3 className="title">Welcome Back!</h3>
            <p>Ensure your connection stays strong! Log in with your personal details.</p>
            <Link href={"/signin"}>
              <Button className='border-zinc-500 text-zinc-100 hover:border-zinc-200 hover:text-zinc-100 transition-colors border border-r-4 border-s-4 rounded-full px-6'>Sign In</Button>
            </Link>
          </div>

          <div className='right'>
            <h3 className='text-center text-2xl font-semibold'>Register Now</h3>
            <div className="socialSignupoptions">
              <Button variant={'outline'} className='socialFormbtn'><FaFacebook className='h-5 w-5'/></Button>
              <Button variant={'outline'} className='socialFormbtn'><FaGoogle className='h-5 w-5'/></Button>
              <Button variant={'outline'} className='socialFormbtn'><FaGithub className='h-5 w-5'/></Button>
            </div>
            <p className='text-center'>or use this option</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                 control={form.control}
                 name='name'
                 render={({ field }) => (
                   <FormItem className='space-y-0 mb-2'>
                     <FormLabel>Name</FormLabel>
                     <FormControl>
                       <Input placeholder='John Paul' {...field}/>
                     </FormControl>
                     <FormMessage/>
                   </FormItem>
                 )}
                />
                
                <FormField
                 control={form.control}
                 name='email'
                 render={({ field }) => (
                   <FormItem className='space-y-0 mb-2'>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                       <Input placeholder='JohnPaul@gmail.com' {...field}/>
                     </FormControl>
                     <FormMessage/>
                   </FormItem>
                 )}
                />

<FormField
                 control={form.control}
                 name='password'
                 render={({ field }) => (
                   <FormItem className='space-y-0 mb-2'>
                     <FormLabel>Password</FormLabel>
                     <FormControl>
                       <Input placeholder='********' type='password' {...field}/>
                     </FormControl>
                     <FormMessage/>
                   </FormItem>
                 )}
                />

<FormField
                 control={form.control}
                 name='confirmPassword'
                 render={({ field }) => (
                   <FormItem className='space-y-0 mb-2'>
                     <FormLabel>Confirm Password</FormLabel>
                     <FormControl>
                       <Input placeholder='' {...field}/>
                     </FormControl>
                     <FormMessage/>
                   </FormItem>
                 )}
                />
                
                 <Button type='submit' className='w-full'>Submit</Button>

              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
