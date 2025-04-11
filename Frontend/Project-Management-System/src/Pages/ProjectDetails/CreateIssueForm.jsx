import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createIssue } from '@/Redux/Issue/Action';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const CreateIssueForm = ({status}) => {
    const dispatch = useDispatch();
    const { id } = useParams ();

    const form = useForm({
        defaultValues: {
            issueName: "",
            description: ""
        }
    })

    const onSubmit = (data) => {
        data.projectId = id;
        dispatch(createIssue({title:data.issueName , description:data.description,projectID:id,status}))
        console.log("Form Data: ", data);
    }

    return (
        <div>

            <Form {...form}>
                <form className='space-y-5' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control}

                        name="issueName"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field}
                                        type="text"
                                        className="border w-full border-gray-700 py-5 px-5"
                                        b placeholder="IssuerName .." />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField control={form.control}

                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field}
                                        type="text"
                                        className="border w-full border-gray-700 py-5 px-5"
                                        b placeholder="Description .." />
                                </FormControl>
                            </FormItem>
                        )}
                    />



                    <DialogClose>
                        <Button type="submit" className="w-full mt-3 ">
                            Create Issue
                        </Button>

                    </DialogClose>
                </form>
            </Form>

        </div>
    )
}

export default CreateIssueForm
