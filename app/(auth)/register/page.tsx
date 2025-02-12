"use client";
import { RegisterForm } from "@/components/register-form";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
	const { register } = useAuth();
	const handleRegister = async (data: {
		username: string;
		email: string;
		password: string;
	}) => {
		try {
			await register(data.username, data.email, data.password);
		} catch (error) {
			console.error("Error during registration:", error);
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10">
			<RegisterForm onSubmit={handleRegister} />
		</div>
	);
}
