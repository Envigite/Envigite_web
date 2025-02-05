import { FiArrowUpRight } from "react-icons/fi";

const Experience = () => {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
      <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
        Experiencia.
      </h2>
      <div className="col-span-1 md:col-span-8">
        <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
          He trabajado en el área portuaria y minera, adquiriendo habilidades en
          logística y operación. Ahora, estoy en transición al mundo de la
          tecnología, aplicando mi experiencia previa en nuevos proyectos de
          desarrollo de software.
        </p>
        <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
          Learn more <FiArrowUpRight className="inline" />
        </button>
      </div>
    </div>
  );
};

export default Experience;
