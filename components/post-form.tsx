"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { FormField, FormItem, FormControl, FormMessage } from "./ui/form";
import { Avatar } from "@radix-ui/react-avatar";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input"; // Import the Input component for title

const postSchema = z.object({
	title: z
		.string()
		.min(6, { message: "Title too short" })
		.max(40, { message: "Max title length is 40" }),
	content: z
		.string()
		.min(10, { message: "Post content too short" })
		.max(500, { message: "Max post length is 500" }),
});

type PostFormValues = z.infer<typeof postSchema>;

interface PostFormProps {
	onSubmit: (data: PostFormValues) => void;
}

export function PostForm({ onSubmit }: PostFormProps) {
	const form = useForm<PostFormValues>({
		resolver: zodResolver(postSchema),
		defaultValues: {
			title: "",
			content: "",
		},
	});

	return (
		<Card className="mb-6">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<CardContent className="pt-6">
						<div className="flex gap-4">
							<Avatar className="h-10 w-10">
								<img
									src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
									alt="Your avatar"
								/>
							</Avatar>
							<div className="flex-1 space-y-4">
								{/* Title Field */}
								<FormField
									control={form.control}
									name="title"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Input
													placeholder="Title of your post"
													{...field}
													className="border border-gray-300 rounded-lg"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{/* Content Field */}
								<FormField
									control={form.control}
									name="content"
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<Textarea
													placeholder="What's on your mind?"
													{...field}
													className="min-h-[100px]"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
					</CardContent>
					<CardFooter className="justify-end">
						<Button type="submit">Post</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
