import React from 'react';
import { Link } from 'react-router-dom';
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "./ui/menubar";
import { Button } from "./ui/button";

const Nav = () => {
    return (
        <Menubar className="w-full px-10 py-5 h-20 items-center justify-between border-b border-solid border-border shadow-sm">
            {/* Logo at the far left */}
            <div className="font-bold text-2xl pl-10">Logo</div>

            {/* Right-aligned content: Nav links + Buttons */}
            <div className="flex items-center space-x-6 mr-10">
                <MenubarMenu>
                    <MenubarTrigger className="text-lg">About</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem asChild><Link to="/about">Our Story</Link></MenubarItem>
                        <MenubarItem asChild><Link to="/about">Team</Link></MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger className="text-lg">Features</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem asChild><Link to="/features">Feature 1</Link></MenubarItem>
                        <MenubarItem asChild><Link to="/features">Feature 2</Link></MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger className="text-lg">Pricing</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem asChild><Link to="/pricing">Plans</Link></MenubarItem>
                        <MenubarItem asChild><Link to="/pricing">Contact Sales</Link></MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger className="text-lg">Contact</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem asChild><Link to="/contact">Support</Link></MenubarItem>
                        <MenubarItem asChild><Link to="/contact">Sales</Link></MenubarItem>
                    </MenubarContent>
                </MenubarMenu>

                {/* Login/Signup Buttons */}
                <div className="flex items-center space-x-4 ml-6">
                    <Button variant="ghost" className="text-lg" asChild><Link to="/login">Login</Link></Button>
                    <Button className="text-lg" asChild><Link to="/signup">Sign Up</Link></Button>
                </div>
            </div>
        </Menubar>
    );
};

export default Nav; 