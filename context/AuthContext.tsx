"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	register: (
		username: string,
		email: string,
		password: string
	) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const response = await fetch("http://localhost:3000/auth/validate", {
					credentials: "include", // Include cookies
				});

				if (response.ok) {
					setIsAuthenticated(true);
				} else {
					setIsAuthenticated(false);
					console.log("Session not validated");
				}
			} catch (error) {
				setIsAuthenticated(false);
				console.log("Error is:", error);
			} finally {
				// await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay for 2 seconds
				setIsLoading(false);
			}
		};

		checkAuth();
	}, []);

	const login = async (email: string, password: string) => {
		try {
			const response = await fetch("http://localhost:3000/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
				credentials: "include", // Include cookies
			});

			if (response.ok) {
				setIsAuthenticated(true);
				router.push("/"); // Redirect to profile after login
			} else {
				console.log("Error loging");
				throw new Error("Login failed");
			}
		} catch (error) {
			console.error(error);
		}
	};

	// Logout function
	const logout = async () => {
		try {
			await fetch("http://localhost:3000/auth/logout", {
				credentials: "include", // Include cookies
			});
			setIsAuthenticated(false);
			router.push("/login"); // Redirect to login after logout
		} catch (error) {
			console.error(error);
		}
	};

	const register = async (
		username: string,
		email: string,
		password: string
	) => {
		try {
			const response = await fetch("http://localhost:3000/auth/register", {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, email, password }),
			});

			if (!response.ok) {
				throw new Error("Registration failed");
			}
			router.push("/login"); // Redirect after successful registration
		} catch (error) {
			console.error("Registration error:", error);
		}
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, isLoading, login, logout, register }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
