"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";


const projects = [
  {
    id: 0,
    title: "EcoSpark",
    description:
      "A serious game that teaches players the importance of budgeting and environmental sustainability.",
    github: "https://github.com/CognicadeStudios/EcoSpark",
    website: "https://pranavdivichenchu.wixstudio.com/main/blank-2",
    image: {
      src: "/ecospark.png",
      alt: "EcoSpark",
    }
  },
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
                <div className="flex flex-row justify-between items-center">
                  <h3 className="text-[1.75rem] font-bold py-3 bg-clip-text text-transparent bg-gradient-to-r from-neon-green to-neon-blue">
                    {project.title}
                  </h3>
                  <button
                    onClick={(e) => handleGithubClick(e, project.github)}
                    className="bg-gradient-to-tr from-yellow-500 to-pink-400 text-white py-1 px-4 rounded-full mt-1 transform transition-transform duration-300 hover:scale-110"
                  >
                    Github
                  </button>
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
