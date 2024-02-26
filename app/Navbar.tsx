"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import Skeleton from "@/app/components/SkeletonComponent";

type Links = {
  label: string;
  href: string;
}[];

const Navbar = () => {
  return (
    <nav className="bg-gray-100 text-lg w-full h-16 px-6 py-4 text-gray-600">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link className="link-underline" href="/">
              {" "}
              <FaBug size={30} fa-bug="true" color="#121212" />{" "}
            </Link>
            <NavbarLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavbarLinks = () => {
  // get data and rename it to session
  const currentPath = usePathname();

  let links: Links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues/list",
    },
  ];

  return (
    <ul className="flex ml-4 space-x-6">
      {links.map((link) => (
        <li className="nav-links cursor-pointer font-medium" key={link.href}>
          <Link
            className={`${
              link.href === currentPath ? "text-blue-500" : ""
            } hover:transition ease-in-out delay-150 hover:text-gray-950 hover:decoration-solid`}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Login
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="flex items-center">
          <Avatar
            src={session?.user?.image!}
            fallback="?"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Logout</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default Navbar;
