import { FC } from "react";
import { ModeToggle } from "./mode-toggle";
import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";

interface NavBarProps {}

const NavBar: FC<NavBarProps> = async ({}) => {
  const user = await currentUser();
  return (
    <>
      <div className="pt-5 pb-2 shadow-md dark:shadow-sm dark:shadow-blue-50 px-[10vw] flex justify-between items-center fixed top-0 left-0 w-full backdrop-blur-sm">
        <div>
          <a href="/">EdgeDB CRUD example</a>
        </div>
        <div className="flex space-x-3">
          <ModeToggle />
          {user && <UserButton />}
          {!user && (
            <Link href="/sign-in">
              <Button variant="ghost">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
