'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";

type Links = {
  label: string;
  href: string;
}[];

function Navbar() {
  let links: Links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ];

  const currentPath = usePathname()

  return (
    <nav className="bg-gray-100 flex justify-between items-center w-full h-16 px-6 text-gray-600">
      <div>
        <Link className="link-underline" href="/">
          {" "}
          <FaBug size={30} fa-bug="true" color="#121212" />{" "}
        </Link>
      </div>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li className="nav-links cursor-pointer font-medium" key={link.href}>
            <Link
              className={`${link.href === currentPath? 'text-blue-500':''} hover:transition ease-in-out delay-150 hover:text-gray-950 hover:decoration-solid`}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
