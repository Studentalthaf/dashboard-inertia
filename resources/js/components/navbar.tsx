import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { User } from '@/types'
import { NavUser } from "./nav-user";

interface NavbarProps {
    children?: React.ReactNode;
}

const user: User = {
    id: 1,
    name: "MOCH ALTHAF JAUHAR",
    email: "jauharalthaf@example.com",
    avatar: "/avatars/shadcn.jpg",
};

const Navbar: React.FC<NavbarProps> = ({ children }) => {
    return (
        <header className="sticky z-10 bg-background/95 support-[backdrop-filter]:bg-background/60 backdrop-blur top-0 flex shrink-0 items-center gap-2 border-b h-16 px-3">
            {children || (
                <>
                    <SidebarTrigger />
                    <div className='ml-auto'>
                        <NavUser user={user} />
                    </div>
                </>
            )}
        </header>
    );
};

export default Navbar;