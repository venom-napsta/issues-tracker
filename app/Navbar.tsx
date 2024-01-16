import Link from "next/link";
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
  return (
    <nav className="nav bg-gray-100 flex justify-between items-center w-full h-20 px-4 text-gray-600 fixed">
      <div>
        <Link className="link-underline" href="/">
          {" "}
          <FaBug size={20} fa-bug="true" color="#121212" />{" "}
        </Link>
      </div>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className="hover:transition ease-in-out delay-150 hover:text-gray-950 hover:decoration-solid"
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
