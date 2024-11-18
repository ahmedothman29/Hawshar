'use client';

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps{
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) =>{

  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  },[]);

  const onRent = useCallback(() => {
    /*if(!currentUser){
      return loginModal.onOpen();
    }*/
    
    rentModal.onOpen();

  }, [currentUser, loginModal, rentModal]);

  return(
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div 
        onClick={onRent}
        className="
        hidden
        md:block
        text-sm
        font-semibold
        border-2
        border-green-800
        border-opacity-40
        py-3
        px-4
        rounded-full
        
        hover:bg-green-800
        hover:text-white 
        hover:shadow-2xl
        transition
        cursor-pointer
        group
        ">
          Rent Now

        </div>
        <div
        onClick={toggleOpen}
        className="
        py-2
        px-4
        border-[2px]
        border-green-600
        border-opacity-40
        flex
        flex-row
        items-center
        gap-3
        rounded-full
        cursor-pointer
        hover:shadow-md
        transition">
          <AiOutlineMenu/>
          <div className="hidden md:block">
            <Avatar src = {currentUser?.image}/>

          </div>

        </div>

      </div>
      {isOpen && (
        <div
        className="
        absolute
        rounded-xl
        shadow-md
        w-[40vw]
        md:w-3/4
        bg-white
        overflow-hiddenear
        right-0
        top-12
        text-sm
        z-50
        ">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
              <MenuItem
              onClick={() => router.push("/trips") }
              label="My Trips"/>
              <MenuItem
              onClick={() => router.push('/favorites')}
              label="My Favourites"/>
              <MenuItem
              onClick={() => router.push("/Reservations") }
              label="My Reservations"/>
              <MenuItem
              onClick={() => router.push('/properties')}
              label="My Properties"/>
              <MenuItem
              onClick={rentModal.onOpen}
              label="Rent Now"/>
              <hr/>
              <MenuItem
              onClick={() => {}}
              label="About Us"/>
              <MenuItem
              onClick={() => {}}
              label="Contacts"/>
               <hr/>
              <MenuItem
              onClick={() => signOut()}
              label="Logout"/>

            </>

            ) : (
            <>
              <MenuItem
              onClick={loginModal.onOpen}
              label="Login"/>
              <hr />
              <MenuItem
              onClick={registerModal.onOpen}
              label="Sign Up"/>
              <hr />
              <MenuItem
              onClick={() => {}}
              label="About Us"/>
              <hr />
              <MenuItem
              onClick={() => {}}
              label="Contacts"/>
            </> )}
          </div>

        </div>
      )}

    </div>

  );
}
export default UserMenu;