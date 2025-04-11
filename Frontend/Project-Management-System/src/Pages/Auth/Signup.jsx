import React from 'react'
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { register } from '@/Redux/Authentication/Action';


const Signup = () => {
   const dispatch = useDispatch();

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
            fullName: "",
        }
    })

    const onSubmit = (data) => {
        console.log("Form Data: ", data);
        dispatch(register(data))

    }
    return (
        <div className='!space-y-5'>
            <h1 className='text-center text-2xl font-semibold' >Register Form</h1>
            <Form {...form}>
                <form className='space-y-5' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control}

                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field}
                                        type="text"
                                        className="border w-[90%] !m-auto border-gray-700 !py-5 !px-5 !mt-5"
                                         placeholder=" Enter Your FullName.." />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField control={form.control}

                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field}
                                        type="text"
                                        className="border !w-[90%] !m-auto border-gray-700 !py-5 !px-5 !mt-5"
                                        placeholder=" Enter Your Email.." />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField control={form.control}

                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field}
                                        type="text"
                                        className="border w-[90%] border-gray-700 !m-auto !py-5 !px-5 !mt-5"
                                         placeholder="Enter Your Password.." />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-[90%] !ml-3.5 !mt-5 ">
                        Register
                    </Button>

                </form>
            </Form>
        </div>
    )
}

export default Signup
