"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { PostForm } from "@/components/post-form";

// Placeholder data
const POSTS = [
	{
		id: 1,
		author: {
			name: "Sarah Wilson",
			avatar:
				"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&h=256&q=80",
		},
		content:
			"Just launched my new portfolio website! Check it out and let me know what you think 🚀",
		timestamp: "2 hours ago",
		likes: 24,
		comments: [
			{
				author: "Alex Chen",
				content: "Looks amazing! Love the design.",
				timestamp: "1 hour ago",
			},
		],
	},
	{
		id: 2,
		author: {
			name: "David Kim",
			avatar:
				"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&h=256&q=80",
		},
		content:
			"Working on a new React project using Next.js 13. The new app router is a game changer!",
		timestamp: "5 hours ago",
		likes: 15,
		comments: [],
	},
];

// function CreatePostCard() {

// 	return (
// 		<Card className="mb-6">
// 			<CardContent className="pt-6">
// 				<div className="flex gap-4">
// 					<Avatar className="h-10 w-10">
// 						<img
// 							src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
// 							alt="Your avatar"
// 						/>
// 					</Avatar>
// 					<div className="flex-1">
// 						<Textarea
// 							placeholder="What's on your mind?"
// 							value={content}
// 							onChange={(e) => setContent(e.target.value)}
// 							className="min-h-[100px]"
// 						/>
// 					</div>
// 				</div>
// 			</CardContent>
// 			<CardFooter className="justify-end">
// 				<Button
// 					onClick={() => {
// 						console.log("Post content:", content);
// 						setContent("");
// 					}}
// 				>
// 					Post
// 				</Button>
// 			</CardFooter>
// 		</Card>
// 	);
// }

function PostCard({ post }) {
	const [isLiked, setIsLiked] = useState(false);
	const [showComments, setShowComments] = useState(false);
	const [newComment, setNewComment] = useState("");

	return (
		<Card className="mb-6">
			<CardHeader>
				<div className="flex justify-between items-start">
					<div className="flex gap-4">
						<Avatar className="h-10 w-10">
							<img src={post.author.avatar} alt={post.author.name} />
						</Avatar>
						<div>
							<p className="font-semibold">{post.author.name}</p>
							<p className="text-sm text-muted-foreground">{post.timestamp}</p>
						</div>
					</div>
					<Button variant="ghost" size="icon">
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				<p className="whitespace-pre-wrap">{post.content}</p>
			</CardContent>
			<CardFooter className="flex flex-col">
				<div className="flex items-center gap-4 w-full">
					<Button
						variant="ghost"
						size="sm"
						className="gap-2"
						onClick={() => setIsLiked(!isLiked)}
					>
						<Heart
							className={`h-4 w-4 ${
								isLiked ? "fill-red-500 text-red-500" : ""
							}`}
						/>
						{post.likes + (isLiked ? 1 : 0)}
					</Button>
					<Button
						variant="ghost"
						size="sm"
						className="gap-2"
						onClick={() => setShowComments(!showComments)}
					>
						<MessageCircle className="h-4 w-4" />
						{post.comments.length}
					</Button>
					<Button variant="ghost" size="sm" className="gap-2">
						<Share2 className="h-4 w-4" />
						Share
					</Button>
				</div>

				{showComments && (
					<div className="w-full mt-4">
						<Separator className="my-4" />
						{post.comments.map((comment, index) => (
							<div key={index} className="mb-4">
								<div className="flex items-start gap-2">
									<p className="font-semibold text-sm">{comment.author}</p>
									<p className="text-sm text-muted-foreground">
										{comment.timestamp}
									</p>
								</div>
								<p className="text-sm mt-1">{comment.content}</p>
							</div>
						))}
						<div className="flex gap-2 mt-4">
							<Textarea
								placeholder="Write a comment..."
								value={newComment}
								onChange={(e) => setNewComment(e.target.value)}
								className="min-h-[60px]"
							/>
							<Button
								onClick={() => {
									console.log("New comment:", newComment);
									setNewComment("");
								}}
							>
								Send
							</Button>
						</div>
					</div>
				)}
			</CardFooter>
		</Card>
	);
}

const handlePost = async (data: { title: string; content: string }) => {
	try {
		const response = await fetch("http://localhost:3000/posts/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title: data.title, content: data.content }),
			credentials: "include",
		});

		if (!response.ok) {
			throw new Error("Post not posted!");
		}
	} catch (error) {
		console.error("Error during post creation:", error);
	}
};
export default function Home() {
	return (
		<div className="container max-w-2xl mx-auto py-8 px-4">
			<PostForm onSubmit={handlePost} />
			{POSTS.map((post) => (
				<PostCard key={post.id} post={post} />
			))}
		</div>
	);
}

// import withProtectedRoute from "@/components/ProtectedRoute";
// import ProtectedRoute from "@/components/ProtectedRoute";
// import { useEffect, useState } from "react";

// function Home() {
// 	const [data, setData] = useState();

// 	const fetchTest = async () => {
// 		try {
// 			const response = await fetch("http://localhost:3000/auth/test", {
// 				method: "GET",
// 				credentials: "include",
// 			});
// 			const data = await response.json();
// 			setData(data);
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};

// 	useEffect(() => {
// 		fetchTest();
// 	}, []);

// 	return <div>{data ? <h1>Yes: {JSON.stringify(data)}</h1> : <h1>No</h1>}</div>;
// }

// export default Home;
