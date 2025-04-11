import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PlusIcon } from '@radix-ui/react-icons'
import React, { useEffect } from 'react'
import InviteUserForm from './InviteUserForm'
import IssueList from './IssueList'
import ChatBox from './ChatBox'
import { useDispatch, useSelector } from 'react-redux'
import { fecthProjectById } from '@/Redux/Project/Action'
import { useParams } from 'react-router-dom'
import { store } from '@/Redux/Store/Store'

const ProjectDetails = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const { project, issues } = useSelector(store => store)

    const handleProjectInvitation = () => {

    }

    useEffect(() => {
        dispatch(fecthProjectById({ id }))
    }, [id])

    const filterIssuesByStatus = (status) => {
        return (issues || []).filter(issue => issue.status === status); // Ensure filtering works with updated issues
    };

    return (
        <>

            <div className='mt-5 lg:px-10 '>
                <div className='lg:flex gap-5 justify-between pb-4'>

                    <ScrollArea className="h-screen  lg:w-[69%] pr-2">
                        <div className='text-gray-400 pb-3 w-full'>
                            <h1 className='text-lg font-semibold pb-5'>{project.projectDetails?.name}</h1>
                        </div>

                        <div className='space-y-5 pb-10  text-sm'>
                            <p className='w-full md:max-w-lg lg:max-w-xl'>{project.projectDetails?.description}</p>

                            <div className='flex'>
                                <p className='w-36'>Project Lead : </p>
                                <p> {project.projectDetails?.owner.fullName} </p>
                            </div>

                            <div className='flex'>
                                <p className='w-36'>Members : </p>
                                <div className='flex items-center gap-2'>
                                    {project.projectDetails?.team.map((item, index) =>
                                        <Avatar key={index} className=" cursor-pointer">
                                            <AvatarFallback>{item.fullName[0]}</AvatarFallback>
                                        </Avatar>
                                    )}

                                </div>

                                <Dialog>
                                    <DialogTrigger>
                                        <DialogClose>
                                            <Button onClick={handleProjectInvitation} size="sm" variant="outline" className="ml-2 cursor-pointer">
                                                <span>Invite</span>
                                                <PlusIcon className='w-3 h-3' />
                                            </Button>
                                        </DialogClose>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Invite Members</DialogTitle>
                                            <InviteUserForm />
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            <div className='flex'>
                                <p className='w-36'>Category : </p>
                                <p> {project.projectDetails?.category} </p>
                            </div>

                            <div className='flex'>
                                <p className='w-36'>Project Lead Name : </p>
                                <Badge> {project.projectDetails?.owner.fullName} </Badge>
                            </div>
                        </div>

                        <section>
                            <p className='py-5 border-b text-lg -tracking-wider'>Tasks</p>

                            <div className='flex md:flex gap-2 justify-between py-5'>

                                <IssueList status="pending" title="Todo List" />
                                <IssueList status="in_progress" title="In-Progress" />
                                <IssueList status="done" title="Done" />

                            </div>
                        </section>


                    </ScrollArea>
                    <div className='lg:w-[30%] rounded-md sticky right-5 top-0'>
                        <ChatBox />
                    </div>
                </div>
            </div>

        </>

    )
}

export default ProjectDetails
