"use client";

import {BsArrowDownRight} from 'react-icons/bs';
import Link from 'next/link';

const services = [
  {
    num: "01",
    title: "Análise de Dados",
    desc: "Interprete dados brutos, crie visualizações claras e gere relatórios estratégicos utilizando ferramentas como Python, Excel, PowerBI e SQL.",
    href: "https://w.app/sophiondatatech",
  },
  {
    num: "02",
    title: "Ciência de Dados",
    desc: "Extraia insights acionáveis a partir de grandes volumes de dados, aplicando estatística, programação e modelagem preditiva.",
    href: "https://w.app/sophiondatatech",
  },
  {
    num: "03",
    title: "Desenvolvimento Web",
    desc: "Crie aplicações modernas e responsivas com tecnologias como HTML, CSS, JavaScript, React e frameworks back-end como Laravel.",
    href: "https://w.app/sophiondatatech",
  },
  {
    num: "04",
    title: "Gerenciamento de Projetos",
    desc: "Gestão de projetos sob medida - do planejamento à entrega final, garantindo prazos, qualidade e resultados.",
    href: "https://w.app/sophiondatatech",
  },
  // {
  //   num: "",
  //   title: "Cloud & Big Data",
  //   desc: "Acelere o ciclo de vida de dados com ferramentas de nuvem como GCP e processe dados em escala com eficiência.",
  //   href: ""
  // },
]

import { motion } from "framer-motion";

const Services = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0 ">
      <div className="container mx-auto">
        <motion.div
          initial={{opacity:0}}
          animate={{
            opacity: 1,
            transition:{ delay:2.4, duration:0.4, ease:"easeIn" }
         }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
        >
          {services.map((service, index) => {
            return (
              <div
                  key={index}
                  className="flex-1 flex flex-col justify-center gap-6 group"
              >
                {/*top*/}
                <div className="w-full flex justify-between items-center">
                  <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">{service.num}</div>
                  <Link href={service.href} target='_blank' className="w-[70px] h-[70px] flex justify-center items-center rounded-full bg-accent text-white transition-all duration-500 group-hover:bg-accent-hover bg-white group-hover:bg-accent transition-all duration-500 hover:-rotate-45">
                    <BsArrowDownRight className="text-primary text-3xl"/>
                  </Link>
                </div>
                {/*title*/}
                <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500">{service.title}</h2>
                {/*descripition*/}
                <p className="text-white/60">{service.desc}</p>
                {/*border*/}
                <div className="border-b border-white/20 w-full"></div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
