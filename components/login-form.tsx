"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "./ui/form";

const loginSchema = z.object({
	email: z.string().email("Email not valid"),
	password: z.string().min(5, { message: "Password minimum length is 5" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
	onSubmit: (data: LoginFormValues) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 p-6 rounded-2xl shadow-md max-w-md mx-auto"
			>
				<h1 className="text-2xl font-semibold text-center">Login</h1>

				{/* Email Field */}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-base font-medium">Email</FormLabel>
							<FormControl>
								<Input
									placeholder="Your email"
									type="email"
									{...field}
									className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Password Field */}
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-base font-medium">Password</FormLabel>
							<FormControl>
								<Input
									placeholder="Your password"
									type="password"
									{...field}
									className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Submit Button */}
				<Button
					type="submit"
					className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-sm transition-colors"
				>
					Submit
				</Button>
			</form>
		</Form>
	);
}
