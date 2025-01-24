import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-black text-snow px-8 md:px-16 lg:px-24">
      <div className="container py-2 flex justify-between items-center">
        {/* Left: Name */}
        <Link href="/">
          <div className="text-2xl font-bold hidden md:inline px-4">Arush</div>
        </Link>

        {/* Center: Links */}
        <div className="flex justify-center flex-grow">
          <Link href="/" 
            className="text-snow hover:text-gamboge py-4 px-3 transition-all duration-300 ease-in"
          > 
            Home
          </Link>
          <Link href="/#about"
            className="text-snow hover:text-gamboge py-4 px-3 transition-all duration-300 ease-in"
          >
            About
          </Link>
          <Link href="/projects"
            className="text-snow hover:text-gamboge py-4 px-3 transition-all duration-300 ease-in"
          >
            My Projects
          </Link>
        </div>

        <Link href="/contact" passHref>
          <button className="transition-all duration-300 ease-in-out bg-pigment-green text-snow hover:bg-gamboge hover:scale-105 py-2 px-4 rounded-full mr-0">
            Contact Me
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
