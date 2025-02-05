import { FiArrowUpRight } from "react-icons/fi";

const Skills = () => {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
      <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
        Habilidades.
      </h2>
      <div className="col-span-1 md:col-span-8">
        <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
          Aún estoy aprendiendo y me considero principiante en muchas áreas,
          pero he adquirido habilidades que me han ayudado a convertirme en un
          programador Full Stack. Algunas tecnologías con las que trabajo
          incluyen Android, Kotlin, XML, Jetpack Compose, Node.js, React,
          Next.js y JavaScript.
        </p>
        <button className="w-full rounded bg-neutral-900 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
          Learn more <FiArrowUpRight className="inline" />
        </button>
      </div>
    </div>
  );
};

export default Skills;
