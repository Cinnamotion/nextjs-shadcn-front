"use client";
import { LoginForm } from "@/components/login-form";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
	const { login } = useAuth();
	const handleLogin = async (data: { email: string; password: string }) => {
		try {
			await login(data.email, data.password);
		} catch (error) {
			console.error("Error during login:", error);
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10">
			<LoginForm onSubmit={handleLogin} />
		</div>
	);
}
