import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DropdownMenu, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { DotsVerticalIcon, PersonIcon } from '@radix-ui/react-icons'
import React from 'react'
import UserList from './UserList'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteIssue } from '@/Redux/Issue/Action'

const IssueCard = ({item,projectId}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleIssueDelete=()=>{
        console.log("Deleting issue:", item); // 
        dispatch(deleteIssue(item.id))
    }
  return (
   
       <Card className="rounded-md  py-1 pb-1">
        <CardHeader className="py-0 pb-1">
           <div className='flex items-center justify-between'>
               <CardTitle  onClick={()=>navigate(`/project/${projectId}/issue/${item.id}`)} className="cursor-pointer text-sm font-semibold ">
                {item.title}
               </CardTitle>

               <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button className="rounded-full cursor-pointer" size="icon" variant="ghost">
                        <DotsVerticalIcon/>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className={"cursor-pointer"}>
                    <DropdownMenuItem>
                        In-Progress
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                       Done
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                       Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={handleIssueDelete}>
                       Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
               </DropdownMenu>
           </div>
        </CardHeader>
          <CardContent className="py-0 -mt-7">
             <div className='flex items-center justify-between'>
                <p>FBP  - {1}</p>
                <DropdownMenu className="w--[30rem] border border-red-400">
                    <DropdownMenuTrigger>
                        <Button size="icon" className={"bg-gray-900 hover:text-black cursor-pointer text-white rounded-full"}>
                            <Avatar>
                                <AvatarFallback className={"cursor-pointer"}>
                                    <PersonIcon  />
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <UserList issueDetails={item}/>
                    </DropdownMenuContent>
                </DropdownMenu>
             </div>
          </CardContent>

       </Card>
       
   
  )
}

export default IssueCard
