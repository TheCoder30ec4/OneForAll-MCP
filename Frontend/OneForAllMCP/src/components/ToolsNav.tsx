import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "./ui/menubar";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,}
  from "./ui/dropdown-menu";
import { auth } from "../FireBase/Config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { toast } from "sonner";

const ToolsNav = () => {
    const [user, setUser] = React.useState<User | null>(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('idToken'); // Clear token from local storage
            toast.success("Logged out successfully!");
            navigate('/login'); // Redirect to login page after logout
        } catch (error: any) {
            console.error("Error during logout:", error);
            toast.error(`Logout Error: ${error.message}`);
        }
    };

    return (
        <Menubar className="w-full px-10 py-5 h-20 items-center justify-between border-b border-solid border-border shadow-sm">
            {/* Logo at the far left */}
            <div className="font-bold text-2xl pl-10">Logo</div>

            {/* Right-aligned content: Nav links + User Details */}
            <div className="flex items-center space-x-6 mr-10">
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

                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar>
                                <AvatarImage src={user.photoURL || undefined} alt="User Avatar" />
                                <AvatarFallback>{user.displayName?.charAt(0) || user.email?.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>{user.displayName || user.email}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <div className="flex items-center space-x-4 ml-6">
                        <Button variant="ghost" className="text-lg" asChild><Link to="/login">Login</Link></Button>
                        <Button className="text-lg" asChild><Link to="/signup">Sign Up</Link></Button>
                    </div>
                )}
            </div>
        </Menubar>
    );
};

export default ToolsNav;
