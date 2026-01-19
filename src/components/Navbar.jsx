import React from "react";

const Navbar = () => {
  return (
    <nav className=" bg-[#1e1e2e] text-white flex justify-between items-center px-5 h-15 ">
      <div className="logo font-extrabold text-2xl tracking-wide">
        <span className="text-green-600">&lt;</span>
        <span className="text-white-800">Vault</span>
        <span className="text-green-600">ify</span>
        <span className="text-green-600">/&gt;</span>
      </div>

      <ul className="justify-center mr-17">
        <li className="flex gap-4">
          <a className="hover:font-bold" href="/">
            Home
          </a>
          <a className="hover:font-bold" href="/about">
            About
          </a>
          <a className="hover:font-bold" href="/contact">
            Contact
          </a>
          <a className="hover:font-bold" href="/signin">
            SignIn
          </a>
        </li>
      </ul>
      <button className="text-white flex gap-1 bg-green-700 ring-1 rounded-full px-2 py-1 cursor-pointer hover:bg-green-900">
        <img
          src="/public/github.png"
          alt="github logo"
          className=" w-5 h-5 my-0.5"
        />
        Github
      </button>
    </nav>
  );
};

export default Navbar;
