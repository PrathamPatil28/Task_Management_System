import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import React from 'react'
import { useForm } from 'react-hook-form'
import { tags } from './ProjectList'
import { DialogClose } from '@/components/ui/dialog'
import { Cross1Icon } from '@radix-ui/react-icons'
import { useDispatch } from 'react-redux'
import { createProjects } from '@/Redux/Project/Action'

const CreateProjectForm = () => {

    const dispatch = useDispatch();

    const form = useForm({
        defaultValues: {
            name: "",
            description: "",
            category: "",
            tags: [],

        }
    })

    const onSubmit = (data) => {
        dispatch(createProjects(data))
        console.log("Create project Data: ", data);

    }

    const handleTagsChange =(newValue)=>{
        const curentTags = form.getValues("tags");

        const updatedTags  = curentTags.includes(newValue)?
        curentTags.filter(tag => tag !== newValue):
        [...curentTags, newValue];

        form.setValue("tags", updatedTags);
    }

    return (
        <div>
            <Form {...form}>
                <form className='space-y-5' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control}

                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field}
                                        type="text"
                                        className="border w-full border-gray-700 py-5 px-5"
                                        b placeholder="Project Name.." />
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
                                        b placeholder="Project Description.." />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select defaultValues="fullStack"
                                        value={field.value}
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="category" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="fullStack">FullStack</SelectItem>
                                            <SelectItem value="frontend">Frontend</SelectItem>
                                            <SelectItem value="backend">Backend</SelectItem>
                                        </SelectContent>

                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select 
                                        // value={field.value}
                                        onValueChange={(value) => {
                                            // field.onChange(value);
                                            handleTagsChange(value);
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Tags" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {
                                                tags.map((item)=><SelectItem key={item} value={item} >{item}</SelectItem>)
                                            }
                                        </SelectContent>

                                    </Select>
                                </FormControl>
                                <div className='flex gap-1 flex-wrap '>
                               { field.value.map((item)=> 
                                  <div key={item} onClick={()=>handleTagsChange(item)} className='cursor-pointer flex rounded-full items-center border gap-2 py-1 px-4'>
                                    <span className='text-sm '>{item}</span>
                                    <Cross1Icon className='h-3 w-3'/>
                                  
                                </div> )}
                                </div>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <DialogClose>
                        {false ? <div><p>You Can Create only 3 Project with free plan , please upgrade your plan </p></div>

                            : <Button type="submit" className="w-full mt-5 ">
                                Create Project
                            </Button>
                        }
                    </DialogClose>
                </form>
            </Form>
        </div>
    )
}

export default CreateProjectForm
