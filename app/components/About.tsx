import { FiArrowUpRight } from "react-icons/fi";

const About = () => {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
      <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
        Gusto en conocerte 😀😋.
      </h2>
      <div className="col-span-1 md:col-span-8">
        <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
          Tengo 30 años y he trabajado en el área portuaria y minera. Hace un
          año me enamoré de la programación y estoy cambiando mi enfoque
          profesional a este campo. Tengo un perro llamado Rito, una gata
          llamada Tita y un gato llamado Tito. Estoy felizmente casado y espero
          poder vivir de la programación.
        </p>
        <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
          Learn more <FiArrowUpRight className="inline" />
        </button>
      </div>
    </div>
  );
};

export default About;
