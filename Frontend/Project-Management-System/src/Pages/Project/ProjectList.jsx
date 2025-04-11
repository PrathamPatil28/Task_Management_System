import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MagnifyingGlassIcon, MixerHorizontalIcon } from '@radix-ui/react-icons'
import React, { useEffect, useState } from 'react'
import ProjectCard from '../ProjectCard/ProjectCard'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '@/Redux/Store/Store'
import { fetchProjects, searchProjects } from '@/Redux/Project/Action'

export const tags = [
    "all",
    "react", "nextjs", "vue", "nuxt", "angular", "svelte",
    "spring boot", "express", "flask", "django", "fastapi", "nestjs",
    "tailwind", "bootstrap", "material-ui",
    "mysql", "postgresql", "mongodb", "sqlite", "redis",
    "oracle", "mariadb", "dynamodb", "firebase",
    "javascript", "typescript", "java", "python", "c++",
    "c#", "go", "kotlin", "ruby", "php", "rust", "swift",
    "docker", "kubernetes", "aws", "azure", "gcp",
    "jenkins", "github actions", "terraform", "ansible",
    "git", "github", "vscode", "postman", "figma",
    "eslint", "prettier", "webpack", "babel",
    "jwt", "oauth", "rest api", "graphql", "websocket",
    "microservices", "ci/cd", "unit testing", "tdd", "pwa"
];

const Projectlist = () => {
    const [keyword, setKeyword] = useState("");
    const { project } = useSelector(store => store);
    const dispatch = useDispatch();

    const handleFilterCategory = (value) => {

        if (value === "all") {
            dispatch(fetchProjects({}))
        }
        else {
            dispatch(fetchProjects({ category: value }))
            // console.log(value, section);
        }
    };

    const handleFilterTags = (value) => {
        console.log("Filtering by tag:", value);
        if (value === "all") {
            dispatch(fetchProjects({}))
        } else {
            dispatch(fetchProjects({ tag: value }))
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setKeyword(value);
        dispatch(searchProjects({ keyword: value }));
    };

      useEffect(()=>{

          dispatch(fetchProjects({}))
      },[])

    return (
        <div className='relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5'>
            <section className='filter section'>
                <Card className="p-5 sticky top-10">
                    <div className='flex justify-between lg:w-[20rem]'>
                        <p className='text-xl tracking-wider'>Filters</p>
                        <Button size="icon" variant="ghost">
                            <MixerHorizontalIcon />
                        </Button>
                    </div>

                    <CardContent className="mt-5">
                        <ScrollArea className="space-y-7 h-[70vh]">
                            <div>
                                <h1 className='pb-3 text-gray-400 border-b'>Category</h1>
                                <RadioGroup className="space-y-3 pt-5"
                                    defaultValue="all"
                                    onValueChange={(value) => handleFilterCategory(value)}
                                >
                                    {["all", "fullStack", "frontend", "backend"].map((item, idx) => (
                                        <div className='flex items-center gap-2 cursor-pointer' key={item}>
                                            <RadioGroupItem className="cursor-pointer" value={item} id={`r-${idx}`} />
                                            <Label htmlFor={`r-${idx}`}>{item}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>

                            <div className='pt-9'>
                                <h1 className='pb-3 text-gray-400 border-b'>Tag</h1>
                                <RadioGroup className="space-y-3 pt-5"
                                    defaultValue="all"
                                    onValueChange={(value) => handleFilterTags(value)}
                                >
                                    {tags.map((item, index) => (
                                        <div key={item} className='flex items-center gap-2'>
                                            <RadioGroupItem className="cursor-pointer" value={item} id={`tag-${index}`} />
                                            <Label htmlFor={`tag-${index}`}>{item}</Label>

                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </section>

            <section className='project-list-section w-full lg:w-[48rem]'>
                <div className='flex items-center pb-5 justify-between gap-2'>
                    <div className='relative p-0 w-full'>
                        <Input
                            onChange={handleSearchChange}
                            placeholder="Search Projects"
                            className="px-9"
                        />
                        <MagnifyingGlassIcon className='absolute top-3 left-4' />
                    </div>
                </div>

                <div className="space-y-5 min-h-[74vh]">
                    {keyword
                        ? project.searchProjects?.map((item) => <ProjectCard key={item.id} item={item} />)
                        : project.projects
                            ?.filter((item) => item && item.id)
                            .map((item) => <ProjectCard key={item.id} item={item} />)
                    }
                </div>
            </section>
        </div>
    );
};

export default Projectlist;
