"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { FaGithub } from "react-icons/fa";


const projects = [
  {
    id: 0,
    title: "EcoSpark",
    description:
      "A serious game that teaches players the importance of budgeting and environmental sustainability.",
    tech: ["Unity", "C#"],
    github: "https://github.com/CognicadeStudios/EcoSpark",
    website: "https://pranavdivichenchu.wixstudio.com/main/blank-2",
    image: {
      src: "/ecospark.png",
      alt: "EcoSpark",
    }
  },
  {
    id:1,
    title: "XL Chess",
    description:
      "A chess game that allows players to play against each other on a variety of board sizes.",
    tech: ["Java", "JavaFX"],
    github: "https://github.com/ArushNo1/XLChess",
    website: "https://github.com/ArushNo1/XLChess",
    image: {
      src: "/xlchess.png",
      alt: "XL Chess",
    }
  },
  {
    id:2,
    title: "Winter Wonderland",
    description: "An image of a simple winter scene with a foreground and backgrond.",
    tech: ["Java AWT"],
    github: "https://github.com/ArushNo1/ITCS/tree/main/WinterWonderLand",
    website: "https://github.com/ArushNo1/ITCS/blob/main/WinterWonderLand/WinterScene.png",
    image: {
      src: "/WinterScene.png",
      alt: "Winter Wonderland",
    }
  },
  {
    id:3,
    title: "Winter Warzone",
    description: "A PvP game with online multiplayer with snowball launchers.",
    tech: ["Unity", "Networking"],
    github: "https://github.com/2900xt/WinterWarzone",
    website: "https://github.com/2900xt/WinterWarzone",
    image: {
      src: "/WinterWarzone.png",
      alt: "Winter Warzone",
    }
  },
  {
    id:4,
    title: "Falcon 9",
    description: "A simulation of the SpaceX Falcon 9 rocket with an animated launch sequence.",
    tech: ["Java AWT"],
    github: "https://github.com/ArushNo1/ITCS/tree/main/Falcon9",
    website: "https://github.com/ArushNo1/ITCS/tree/main/Falcon9",
    image: {
      src: "/Falcon9.png",
      alt: "Falcon 9",
    }
  }
];

export default function ProjectPage() {
  const handleGithubClick = (e: React.MouseEvent, githubLink: string) => {
    e.stopPropagation();
    window.open(githubLink, "_blank");
  };

  return (
    <div>
      <Navbar />
      <div className="bg-black text-white py-20" id="skills">
        <div className="container mx-auto px-8 md:px-16 lg:px-24">
          <h2 className="text-4xl font-bold text-center mb-12">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-800 rounded-2xl px-4 py-4 hover:shadow-lg transform transition-transform duration-300 hover:scale-105"
                onClick={() => window.open(project.website, "_blank")} 
              >
                <img
                  src={project.image.src}
                  alt={project.image.alt}
                  className="w-full h-48 object-cover rounded-lg rounded-tl-lg"
                />
                <div className="flex flex-row justify-between items-center pt-2 pb-1">
                  <h3 className="text-[1.75rem] font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-green to-neon-blue">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 pt-1">{project.tech.join(", ")}</p>
                  <div className='align-top pb-1'>
                    <button
                      onClick={(e) => handleGithubClick(e, project.github)}
                      className="bg-gradient-to-tr from-yellow-500 to-pink-400 text-white py-1 px-2 rounded-full mt-1 transform transition-transform duration-300 hover:scale-110"
                    >
                      <FaGithub />
                    </button>
                  </div>
                  
                </div>
                <p>{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
