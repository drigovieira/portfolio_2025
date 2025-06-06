"use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea} from "@/components/ui/textarea";
//
// import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Telefone",
    description: "+55 12 978122934",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "rodrigpiresvieira20@gmail.com",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Localização",
    description: "São José dos Campos-SP",
  }
]

import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";

// Lógica para deixar o envio funcional



const Contact = () => {
  return (
    <motion.section
      initial={{opacity: 0}}
      animate={{
        opacity: 1,
        transition: {
          delay: 2.4,
          duration: 0.4,
          ease: 'easeIn',
        }
      }}
      className='py-6'
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          {/*form*/}
          <div className='xl:w-[58%] order-2 xl:order-none'>
            <ContactForm />
            {/*<form action="" className='flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl'>*/}
            {/*  <h3 className='text-4xl text-accent'>Vamos criar algo incrível juntos? </h3>*/}
            {/*  <p className='text-white/60'>Discuta seu projeto comigo e veja como posso ajudar.</p>*/}
            {/*  /!*input*!/*/}
            {/*  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>*/}
            {/*    <Input type='firstname' placeholder='Primeiro nome' />*/}
            {/*    <Input type='lastname' placeholder='Último nome' />*/}
            {/*    <Input type='email' placeholder='Email' />*/}
            {/*    <Input type='phone' placeholder='Telefone de contato' />*/}
            {/*  </div>*/}
            {/*  <Select>*/}
            {/*    <SelectTrigger className='w-full'>*/}
            {/*      <SelectValue placeholder='Selecione um serviço' />*/}
            {/*    </SelectTrigger>*/}
            {/*    <SelectContent>*/}
            {/*      <SelectGroup>*/}
            {/*        <SelectLabel>Selecione um serviço</SelectLabel>*/}
            {/*        <SelectItem value='est'>Análise de Dados</SelectItem>*/}
            {/*        <SelectItem value='cst'>Ciência de Dados</SelectItem>*/}
            {/*        <SelectItem value='mst'>Desenvolvimento Web</SelectItem>*/}
            {/*        <SelectItem value='ost'>Outro</SelectItem>*/}
            {/*      </SelectGroup>*/}
            {/*    </SelectContent>*/}
            {/*  </Select>*/}
            {/*  /!*textarea*!/*/}
            {/*  <Textarea className='h-[200px]' placeholder='Deixe sua mensagem aqui!' />*/}
            {/*  /!*btn*!/*/}
            {/*  <Button size='md' className='max-w-40 h-12'>Enviar</Button>*/}
            {/*</form>*/}
          </div>

          {/*info*/}
          <div className='flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0'>
            <ul className='flex flex-col gap-10'>
              {
                info.map((item, index) => {
                  return (
                      <li key={index} className='flex items-center gap-6'>
                        <div className='w-[52px] h-[52px] xl:w-[52px] xl:h-[52px] bg-[#27272c] text-accent rounded-md flex justify-center items-center'>
                          <div className='text-[28px]'>{item.icon}</div>
                        </div>
                        <div className='flex-1'>
                          <p className='text-white/60'>{item.title}</p>
                          <h3 className='text-xl'>{item.description}</h3>
                        </div>
                      </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact