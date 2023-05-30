'use client'

import Container from "../container/Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import {SafeUser} from "@/app/types";
import Categories from "@/app/components/navbar/Categories";

interface NavBarProps {
    currentUser?: SafeUser | null
}

const NavBar: React.FC<NavBarProps> = ({currentUser}) => {
  return (
    <div className="fixed w-full bg-white z-10 s">
      <div className="border-b-[1px] py-4">
        <Container>
            <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                <Logo/>
                <Search/>
                <UserMenu currentUser={currentUser}/>
            </div>
        </Container>
      </div>
        <Categories/>
    </div>
  );
};

export default NavBar;
