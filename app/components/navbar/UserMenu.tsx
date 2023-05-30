"use client";

import {AiOutlineMenu} from "react-icons/ai";
import Avtar from "../avatar/Avatar";
import {useCallback, useEffect, useState} from "react";
import MenuItem from "./Menuitem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import {BiLogIn} from "react-icons/bi";
import {TbRegistered} from "react-icons/tb";
import useLoginModal from "@/app/hooks/useLoginModal";
import {signOut} from "next-auth/react";
import {SafeUser} from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
    const router = useRouter()
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();

    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    const onRent = useCallback(() => {
        if (!currentUser){
            loginModal.onOpen()
        }

        rentModal.onOpen()
    }, [rentModal ,currentUser, loginModal])

    return (
        <div className={`relative`}>
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={onRent} className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                    Airbnb your home
                </div>
                <div
                    onClick={toggleOpen}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transitions"
                >
                    <AiOutlineMenu/>
                    <div className="hidden md:block">
                        <Avtar src={currentUser?.image}/>
                    </div>
                </div>
            </div>
            <div
                 className={`
                 ${isOpen ? 'transition-opacity duration-300 opacity-100' : 'transition-opacity duration-300 opacity-0'}
                 `}
            >
                {isOpen && (
                    <div
                        className={`
                        absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm
                    `}>
                        <div className="flex flex-col cursor-pointer">
                            {currentUser ? (<>
                                <MenuItem label={'My Trips'} onClick={()=>router.push('/trips')}/>
                                <MenuItem label={'My Favorites'} onClick={()=>router.push('/favorites')}/>
                                <MenuItem label={'My Reservations'} onClick={()=>router.push('/reservations')}/>
                                <MenuItem label={'My Properties'} onClick={()=>router.push('/properties')}/>
                                <MenuItem label={'Airbnb My Home'} onClick={onRent}/>
                                <MenuItem label={'Logout'} onClick={() => signOut()}/>
                            </>) : (<>
                                <MenuItem icon={BiLogIn} label={'Log In'} onClick={loginModal.onOpen}/>
                                <MenuItem icon={TbRegistered} label={'Sign Up'} onClick={registerModal.onOpen}/>
                            </>)}

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserMenu;
