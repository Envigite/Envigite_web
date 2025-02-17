import { FiUser } from "react-icons/fi";
import Content from "../utils/Content";

const About = () => {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-12">
      <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
        <FiUser className="text-purple-600 text-4xl" />
        ¡Encantado de conocerte! 😊
      </h2>

      {/* Contenido */}
      <div className="mt-6 bg-gray-50 p-6 rounded-xl shadow-md">
        <Content>
          Hace dos años descubrí mi verdadera pasión: la programación. Desde
          entonces, he estado dedicando mi tiempo y energía a aprender y
          desarrollar habilidades en el mundo del código, con el objetivo de
          convertirme en un profesional destacado. Mi entusiasmo por la
          tecnología me impulsó a cambiar mi enfoque profesional hacia este
          campo, y estoy comprometido con convertirme en un desarrollador
          exitoso. Mi experiencia laboral previa me ha dotado de una gran
          capacidad para resolver problemas, trabajar en equipo y adaptarme a
          entornos desafiantes, habilidades que ahora aplico en el mundo del
          desarrollo de software.
        </Content>
        <Content>Algunos aspectos clave sobre mí:</Content>
        <Content>
          🖥️ <strong>Enfoque profesional:</strong> Actualmente estoy enfocado en
          el desarrollo de software, con interés en Android (Kotlin), desarrollo
          web con (React, Next.js) y soluciones fullstack con TypeScript.
        </Content>
        <Content>
          🛠️ <strong>Experiencia laboral diversa:</strong> He trabajado en roles
          como instalador de redes, instrumentista y frigorista, lo que me ha
          permitido desarrollar una mentalidad práctica y resolutiva.
        </Content>
        <Content>
          🎯 <strong>Objetivo:</strong> Me considero una persona creativa y
          resolutiva, siempre dispuesta a aprender y enfrentar nuevos desafíos.
          Mi meta es vivir de la programación, contribuyendo a proyectos
          innovadores y desafiantes.
        </Content>
        <Content>
          🍞 <strong>Intereses personales:</strong> Fuera del código, disfruto
          de muchos hobbies, como hacer feliz a mi esposa, cocinar, hornear
          pancito, ver animé, salir a correr o armar un mundo de minecraft con
          mis amigos.
        </Content>
        <Content>
          Estoy emocionado por seguir creciendo en este campo y contribuir con
          soluciones creativas y eficientes. Si buscas a alguien con
          determinación, curiosidad y ganas de aprender, ¡estaré encantado de
          conectar contigo!
        </Content>
      </div>
    </div>
  );
};

export default About;
