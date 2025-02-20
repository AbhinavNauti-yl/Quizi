import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-700 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-bold">Quizi</div>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-white hover:text-gray-300">Home</a>
          <a href="#" className="text-white hover:text-gray-300">About</a>
          <a href="#" className="text-white hover:text-gray-300">Services</a>
          <a href="#" className="text-white hover:text-gray-300">Contact</a>
        </div>
        <div className="md:hidden text-white" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-blue-500">
          <a href="#" className="block py-2 px-4 text-white hover:bg-blue-700">Home</a>
          <a href="#" className="block py-2 px-4 text-white hover:bg-blue-700">About</a>
          <a href="#" className="block py-2 px-4 text-white hover:bg-blue-700">Services</a>
          <a href="#" className="block py-2 px-4 text-white hover:bg-blue-700">Contact</a>
        </div>
      )}
    </nav>
  );
}
