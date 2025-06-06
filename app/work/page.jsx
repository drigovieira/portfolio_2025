"use client";

import {motion} from "framer-motion";
import React, {useState} from "react";

import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";

import {BsArrowUpRight, BsGithub} from 'react-icons/bs';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";
import WorkSliderBtns from "@/components/WorkSliderBtns";

import Link from "next/link";
import Image from "next/image";

import {projects} from '@/data/projects';
import {isValidUrl} from '@/utils/utils'

const Work = () => {
    const [project, setProject] = useState(projects[0]);

    const handleSlideChange = (swiper) => {
        // get current slide index
        const currentIndex = swiper.activeIndex;

        // update project state based on current slide index
        setProject(projects[currentIndex]);
    }

    return (
        <motion.section
            initial={{opacity: 0}}
            animate={{
                opacity: 1,
                transition: {delay: 2.4, duration: 0.4, ease: "easeIn"}
            }}
            className='min-h-[80vh] flex flex-col justify-center py-12 xl:py-0'
        >
            <div className="container mx-auto">
                <div className='flex flex-col xl:flex-row xl:gap-[30px]'>
                    <div
                        className='w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none'>
                        <div className='flex flex-col gap-[24px] h-[50%]'>
                            { /* outline num */}
                            <div
                                className="text-8xl leading-none font-extrabold text-transparent text-outline">{project.num}</div>
                            {/* project category */}
                            <div className='flex items-center gap-[30px]'>
                                <h2 className='text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize'>
                                    {project.title}
                                </h2>
                                <span
                                    className='text-md font-medium xl:font-normal text-accent bg-transparent border border-accent rounded-full px-3 flex items-center capitalize'>
                  {project.category}
                </span>
                            </div>

                            { /* project description */}
                            <p className='text-white/60'>{project.description}</p>
                            {/*stack*/}
                            <ul className='flex gap-4'>
                                {
                                    project.stack.map((item, index) => {
                                        return (
                                            // <li key={index} className='flex items-center text-md font-medium xl:text-md text-primary bg-accent px-3'>
                                            //   { item.name }
                                            //   {/*remove the last comma*/}
                                            //   {/*{ index !== project.stack.length - 1 && ','}*/}
                                            // </li>
                                            <li key={index} className=''>
                                                <TooltipProvider
                                                    delayDuration={100}>
                                                    <Tooltip>
                                                        <TooltipTrigger
                                                            className='w-full h-full bg-[#232329] rounded-xl flex justify-center items-center group cursor-default'>
                                                            <div
                                                                className='text-3xl group-hover:text-accent transition-all duration-300 p-4'>
                                                                {item.icon}
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p className='capitalize'>{item.name}</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            {/*border*/}
                            <div className='border border-white/20'></div>
                            {/*buttons*/}
                            <div className='flex items-center gap-4 '>
                                {/*live project button*/}
                                {project.live && isValidUrl(project.live) && (
                                    <Link href={project.live} target={'_blank'}>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger
                                                    className='w-[70px] h-[70px] flex justify-center items-center rounded-full bg-white/5 group'>
                                                    <BsArrowUpRight
                                                        className='text-white text-3xl group-hover:text-accent'/>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Live project</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </Link>
                                )}
                                {/*github project button*/}
                                {project.github && isValidUrl(project.github) && (
                                    <Link href={project.github}
                                          target={'_blank'}>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger
                                                    className='w-[70px] h-[70px] flex justify-center items-center rounded-full bg-white/5 group'>
                                                    <BsGithub
                                                        className='text-white text-3xl group-hover:text-accent'/>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Github repository</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='w-full xl:w-[50%]'>
                        <Swiper
                            spaceBetween={30}
                            slidesPerView={1}
                            className='xl:h-[520px] mb-12'
                            onSlideChange={handleSlideChange}
                        >
                            {
                                projects.map((project, index) => {
                                    return (
                                        <SwiperSlide key={index}
                                                     className='w-full'>
                                            <div
                                                className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                                                {/*overlay*/}
                                                <div
                                                    className='absolute top-0 bottom-0 w-full h-full bg-black/10 z-10'></div>
                                                {/*image*/}
                                                <div
                                                    className='relative w-full h-full'>
                                                    <Image src={project.image}
                                                           alt={project.alt}
                                                           fill
                                                           className='object-cover'/>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                            }
                            {/*slider buttons*/}
                            <WorkSliderBtns
                                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                                btnStyles='bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all'
                            />
                        </Swiper>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}

export default Work