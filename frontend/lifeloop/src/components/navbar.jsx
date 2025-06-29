// components/Navbar.jsx
import { useState } from 'react';
import { Menu, X, User } from 'lucide-react'; // optional: icon library

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white-500 top-0 left-0 shadow-lg fixed w-full z-10">
      <div className="px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-3xl font-bold text-blue-600">LifeLoop</div>

          {/* Desktop Links */}
          <div className="flex  text-gray-700">
            <div className="font-bold hidden md:flex">
              <User className='mt-1 mr-1 md:block ' strokeWidth={2.5} size={17}/>
            </div>
            <div className="font-bold  md:hidden">
              <User className='mt-1 mr-1 md:block ' strokeWidth={2.5} size={24}/>
            </div>
            <div className="hidden md:flex font-bold">Aswin Sandeep</div>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-2 shadow">
          <a href="#home" className="block hover:text-blue-500">Home</a>
          <a href="#about" className="block hover:text-blue-500">About</a>
          <a href="#contact" className="block hover:text-blue-500">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
