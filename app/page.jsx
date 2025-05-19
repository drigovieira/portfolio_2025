import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";

// Componentes
import Social from "@/components/Social";
import Stats from "@/components/Stats";
import Photo from "@/components/Photo";

const Home = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row justify-between items-center xl:pt-8 xl:pb-24">
          {/* Texto */}
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">Engenheiro de Soluções</span>
            <h1 className="h1 mb-6">
              Olá, eu sou o <br />{" "}
              <span className="text-accent">Rodrigo Vieira</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white/80">
              {/*Atuo na área de dados, especificamente em Ciência de Dados,*/}
              {/*com proficiência em Python e seus frameworks*/}
              {/*(Pandas, NumPy, Scikit-learn, PySpark, Matplotlib, Seaborn), SQL, Power BI e Excel.*/}
              {/*Minha formação em Banco de Dados complementa minhas habilidades analíticas*/}
              {/*e meu entusiasmo por Machine Learning.*/}
              Especialista em Ciência de Dados, com domínio em Python (Pandas, NumPy, Scikit-learn, Spark, PySpark, Matplotlib e Seaborn), SQL, Power BI e Excel. Graduando em Banco de Dados e foco em Big Data, Redes Neurais e Deep Learning.
            </p>
            {/* Botão e Redes Sociais*/}
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <Button
                className="uppercase flex items-center gap-2"
                variant="outline"
                size="lg"
                href="../assets/Rodrigo_Vieira_CV.pdf"
                download="Rodrigo_Vieira_CV.pdf"
              >
                <span>Download CV</span>
                <FiDownload className="text-xl" />
              </Button>
              <div className="mb-8 xl:mb-0">
                <Social
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* Foto */}
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
    </section>
  );
};

export default Home;
