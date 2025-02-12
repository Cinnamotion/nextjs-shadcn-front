"use client";

import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
// import { usePathname } from "next/navigation";
import { Home, User, LogIn, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/context/AuthContext";

// This would come from your auth provider
// const isLoggedIn = false; // Replace with actual auth state

export function Navbar() {
	// const pathname = usePathname();
	const { isAuthenticated, logout } = useAuth();
	// const isAuthenticated = false;

	return (
		<div className="border-b">
			<div className="container flex h-16 items-center px-4">
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<Link href="/" legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									<Home className="mr-2 h-4 w-4" />
									Home
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link href="/profile" legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									<User className="mr-2 h-4 w-4" />
									Profile
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
				<div className="ml-auto flex items-center space-x-4">
					<ThemeToggle />
					{isAuthenticated ? (
						<Button variant="ghost" onClick={logout}>
							<LogOut className="mr-2 h-4 w-4" />
							Logout
						</Button>
					) : (
						<>
							<Link href="/login">
								<Button
									variant="ghost"
									onClick={() => {
										// Add your login logic here
										console.log("Login clicked");
									}}
								>
									<LogIn className="mr-2 h-4 w-4" />
									Login
								</Button>
							</Link>
							<Link href="/register">
								<Button
									variant="ghost"
									onClick={() => {
										// Add your login logic here
										console.log("Login clicked");
									}}
								>
									<LogIn className="mr-2 h-4 w-4" />
									Register
								</Button>
							</Link>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
