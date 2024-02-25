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
      href: "/issues/list",
    },
  ];

  // get data and rename it to session
  const { status, data: session } = useSession();
  const currentPath = usePathname();

  return (
    <nav className="bg-gray-100 text-lg w-full h-16 px-6 py-4 text-gray-600">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link className="link-underline" href="/">
              {" "}
              <FaBug size={30} fa-bug="true" color="#121212" />{" "}
            </Link>
            <ul className="flex ml-4 space-x-6">
              {links.map((link) => (
                <li
                  className="nav-links cursor-pointer font-medium"
                  key={link.href}
                >
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
          </Flex>

          <Box>
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger className="flex items-center">
                  <Avatar
                    src={session?.user?.image!}
                    fallback="?"
                    radius="full"
                    className="cursor-pointer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">{session.user!.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Logout</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
}

export default Navbar;
