"use client";

import { anosExperiencia } from '@/utils';
import { contato } from '@/data/info';
import { skills } from '@/data/skills';

const about = {
  title: 'Sobre mim',
  description: 'Profissional da área de Ciência de Dados, com experiência em desenvolvimento web e foco em análise, modelagem e visualização de dados. Em constante aprimoramento de Python, estatística, GCP e técnicas de machine learning para aplicar soluções orientadas a dados.',
  info: [
    {
      fieldName: 'Nome',
      fieldValue: 'Rodrigo Vieira'
    },
    {
      fieldName: 'Localização',
      fieldValue: 'São José dos Campos - SP'
    },
    {
      fieldName: 'Telefone',
      fieldValue: contato.telefone
    },
    {
      fieldName: 'Experiência',
      fieldValue: anosExperiencia + '+ Anos'
    },
    {
      fieldName: 'Nacionalidade',
      fieldValue: 'Brasileira'
    },
    {
      fieldName: 'Email',
      fieldValue: contato.email
    },
    {
      fieldName: 'Freelance',
      fieldValue: 'Disponível'
    },
    {
      fieldName: 'Idiomas',
      fieldValue: 'Português, Inglês e Espanhol'
    }
  ]
}

const experience = {
  title: 'Minha experiência',
  icon: '../../public/assets/resume/badge.svg',
  description: 'Atuei como desenvolvedor web full stack em projetos diversos, utilizando tecnologias modernas para soluções digitais. Iniciei minha carreira no ensino de inglês, o que desenvolveu minhas habilidades de comunicação e didática. Desde 2021, venho consolidando minha experiência em desenvolvimento de software, com foco atual em transição para Ciência de Dados.',
  items: [
    {
      "company": "Freelancer",
      "position": "Programador Web Full Stack",
      "duration": "2021 - Atual"
    },
    {
      company: 'Objective Marketing Solution',
      position: 'Desenvolvedor Web Full Stack',
      duration: '2023 - 2024'
    },
    {
      company: 'Plus Intelligence',
      position: 'Desenvolvedor Web Full Stack Júnior',
      duration: '2022 - 2023'
    },
    {
      company: 'Plus Intelligence',
      position: 'Estagiário de Desenvolvimento',
      duration: '2021 - 2022'
    },
    {
      company: 'Change Language School',
      position: 'Professor de Inglês',
      duration: '2018 - 2024'
    },
    {
      company: 'CPI Tegus',
      position: 'Estagiário Eng. de Qualidade',
      duration: '2016 - 2017'
    },
    {
      company: 'Basf',
      position: 'Estagiário Eng. de Projetos',
      duration: '01/2016 - 09/2016'
    },
    {
      company: 'Iochpe Maxion',
      position: 'Operador de Produção',
      duration: '2011 - 2013'
    },
    {
      company: 'Iochpe Maxion',
      position: 'Aprendiz Senai',
      duration: '2010 - 2011'
    }
  ]
}

const education = {
  title: 'Minha educação',
  icon: '../../public/assets/resume/cap.svg',
  description: 'Minha formação combina tecnologia, gestão e ciência de dados. Sou graduado em Análise e Desenvolvimento de Sistemas e Engenharia de Produção. Atualmente curso Banco de Dados na FATEC e especializações em Gestão em Tecnologia e Ciência de Dados, com foco em aplicações práticas no mercado.',
  items: [
    {
      institution: 'FATEC - Prof. Jessen Vidal',
      degree: 'Banco de Dados',
      duration: '2025 (cursando)'
    },
    {
      institution: 'Escola Conquer (Pós)',
      degree: 'Gestão e Liderança em Tecnologia',
      duration: '2024 (cursando)'
    },
    {
      institution: 'Escola DNC',
      degree: 'Ciência de Dados',
      duration: '2024 - 2025'
    },
    {
      institution: 'FATEC Cruzeiro',
      degree: 'Análise e Desenvolv. de Sistemas',
      duration: '2018 - 2023'
    },
    {
      institution: 'Facic Cruzeiro',
      degree: 'Engenharia de Produção',
      duration: '2011 - 2024'
    }
  ]
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

const Resume = () => {
  return (
      <motion.div
        initial={{opacity:0}}
        animate={{
          opacity: 1,
          transition:{ delay:2.4, duration:0.4, ease:"easeIn" }
        }}
        className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
      >
        <div className="container mx-auto">
          <Tabs defaultValue='experience' className='flex flex-col xl:flex-row gap-[60px]'>
            <TabsList className='flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6'>
              <TabsTrigger value='experience'>Experiência</TabsTrigger>
              <TabsTrigger value='education'>Educação</TabsTrigger>
              <TabsTrigger value='skills'>Habilidades</TabsTrigger>
              <TabsTrigger value='about'>Sobre mim</TabsTrigger>
            </TabsList>
            {/*content*/}
            <div className='min-h-[70vh] w-full'>
              {/*experience*/}
              <TabsContent value='experience' className='w-full'>
                <div className='flex flex-col gap-[30px] text-center xl:text-left'>
                  <h3 className='text-4xl font-bold'>{experience.title}</h3>
                  <p className='max-w-[700px] xl:max-w-[960px] text-white/60 mx-auto xl:mx-0'>{experience.description}</p>
                  <ScrollArea className='h-[400px]'>
                    <ul className='grid grid-cols-1 lg:grid-cols-2 gap-[30px]'>
                      {experience.items.map((item, index) => {
                        return (
                          <li key={index} className='bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1'>
                            <span className='text-accent'>{item.duration}</span>
                            <h3 className='text-xl max-w-[260px] min-h-[60px] text-center lg:text-left'>{item.position}</h3>
                            <div className='flex items-center gap-3' >
                              {/*{dot}*/}
                              <span className='w-1.5 h-1.5 rounded-full bg-accent'></span>
                              <p className='text-white/60'>{item.company}</p>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  </ScrollArea>
                </div>
              </TabsContent>

              {/*education*/}
              <TabsContent value='education' className='w-full'>
                <div className='flex flex-col gap-[30px] text-center xl:text-left'>
                  <h3 className='text-4xl font-bold'>{education.title}</h3>
                  <p className='max-w-[700px] xl:max-w-[960px] text-white/60 mx-auto xl:mx-0'>{education.description}</p>
                  <ScrollArea className='h-[400px]'>
                    <ul className='grid grid-cols-1 lg:grid-cols-2 gap-[30px]'>
                      {education.items.map((item, index) => {
                        return (
                            <li key={index} className='bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1'>
                              <span className='text-accent'>{item.duration}</span>
                              <h3 className='text-xl max-w-[260px] min-h-[60px] text-center lg:text-left lg:max-w-[100%]'>{item.degree}</h3>
                              <div className='flex items-center gap-3' >
                                {/*{dot}*/}
                                <span className='w-1.5 h-1.5 rounded-full bg-accent'></span>
                                <p className='text-white/60'>{item.institution}</p>
                              </div>
                            </li>
                        )
                      })}
                    </ul>
                  </ScrollArea>
                </div>
              </TabsContent>

              {/*skills*/}
              <TabsContent value='skills' className='w-full h-full'>
                <div className="flex flex-col gap-[30px]">
                  <div className='flex flex-col gap-[30px] text-center xl:text-left'>
                    <h3 className='text-4xl font-bold'>{skills.title}</h3>
                    <p className='max-w-[700px] xl:max-w-[960px] text-white/60 mx-auto xl:mx-0'>{skills.description}</p>
                  </div>
                  <ScrollArea className='h-[350px] 2xl:h-[435px]'>
                    <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]'>
                      {skills.skillList.map((skill, index) => {
                        return (
                          <li key={index} className=''>
                            <TooltipProvider delayDuration={100}>
                              <Tooltip>
                                <TooltipTrigger className='w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group'>
                                  <div className='text-6xl group-hover:text-accent transition-all duration-300'>
                                    {skill.icon}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className='capitalize'>{skill.name}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </li>
                        )
                      })}
                    </ul>
                  </ScrollArea>
                </div>
              </TabsContent>

              {/*about*/}
              <TabsContent value='about' className='w-full text-center xl:text-left'>
                <div className="flex flex-col gap-[30px]">
                  <div className='flex flex-col gap-[30px] text-center xl:text-left'>
                    <h3 className='text-4xl font-bold'>{about.title}</h3>
                    <p className='max-w-[700px] xl:max-w-[960px] text-white/60 mx-auto xl:mx-0'>{about.description}</p>
                  </div>
                  <div>
                    <ul className='grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0 xl:max-w-[960px]'>
                      {about.info.map((item, index) => {
                        return (
                          <li key={index} className='flex items-center justify-center xl:justify-start gap-4'>
                            <span className='text-white/60'>{item.fieldName}</span>
                            <span className='text-xl'>{item.fieldValue}</span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </motion.div>
  )
}

export default Resume