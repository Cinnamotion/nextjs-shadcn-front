// "use client";
// import { useEffect, useState } from "react";

// export default function Profile() {
// const [user, setUser] = useState(null);

// const fetchUser = async () => {
// 	try {
// 		const response = await fetch(`http://localhost:3000/users/myuser`, {
// 			credentials: "include",
// 			method: "GET",
// 		});
// 		console.log(response);
// 		if (response.ok) {
// 			const data = await response.json();
// 			setUser(data);
// 		} else {
// 			console.log("Error loading user data");
// 		}
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// useEffect(() => {
// 	fetchUser();
// }, []);

// 	return (
// 		<div>
// 			{user ? (
// 				<div>Yes:{JSON.stringify(user)}</div>
// 			) : (
// 				<div>No:{JSON.stringify(user)}</div>
// 			)}
// 		</div>
// 	);
// }

"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
	Mail,
	MapPin,
	Briefcase,
	Calendar,
	Link as LinkIcon,
	Edit,
	Settings,
	Activity,
} from "lucide-react";
import { useState, useEffect } from "react";
import { User } from "@/types/types";

export default function ProfilePage() {
	const [user, setUser] = useState<User | null>(null);

	const fetchUser = async () => {
		try {
			const response = await fetch(`http://localhost:3000/users/myuser`, {
				credentials: "include",
				method: "GET",
			});
			console.log(response);
			if (response.ok) {
				const data = await response.json();
				setUser(data);
			} else {
				console.log("Error loading user data");
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	return (
		<div className="container mx-auto py-10">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* Left Column - Profile Info */}
				<div className="md:col-span-1">
					<Card>
						<CardContent className="pt-6">
							<div className="flex flex-col items-center space-y-4">
								<Avatar className="h-24 w-24">
									<img
										src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
										alt="Profile picture"
										className="aspect-square h-full w-full"
									/>
								</Avatar>
								<div className="text-center">
									<h2 className="text-2xl font-bold">John Doe</h2>
									<p className="text-muted-foreground">Senior Developer</p>
									<p>{user?.email}</p>
								</div>
								<Button className="w-full" variant="outline">
									<Edit className="mr-2 h-4 w-4" />
									Edit Profile
								</Button>
							</div>

							<Separator className="my-6" />

							<div className="space-y-4">
								<div className="flex items-center">
									<Mail className="mr-2 h-4 w-4 text-muted-foreground" />
									<span className="text-sm">{user?.email}</span>
								</div>
								<div className="flex items-center">
									<MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
									<span className="text-sm">San Francisco, CA</span>
								</div>
								<div className="flex items-center">
									<Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
									<span className="text-sm">TechCorp Inc.</span>
								</div>
								<div className="flex items-center">
									<Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
									<span className="text-sm">
										Joined{" "}
										{user?.created_at
											? new Date(user.created_at).toLocaleDateString()
											: ""}
									</span>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Right Column - Tabs */}
				<div className="md:col-span-2">
					<Tabs defaultValue="overview" className="space-y-4">
						<TabsList>
							<TabsTrigger value="overview">Overview</TabsTrigger>
							<TabsTrigger value="activity">Activity</TabsTrigger>
							<TabsTrigger value="settings">Settings</TabsTrigger>
						</TabsList>

						<TabsContent value="overview" className="space-y-4">
							<Card>
								<CardHeader>
									<h3 className="text-lg font-semibold">About Me</h3>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">
										Passionate developer with over 8 years of experience in
										full-stack development. Specialized in React, Node.js, and
										cloud architecture. Always eager to learn and share
										knowledge with the community.
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<h3 className="text-lg font-semibold">Skills</h3>
								</CardHeader>
								<CardContent>
									<div className="flex flex-wrap gap-2">
										<Badge variant="secondary">React</Badge>
										<Badge variant="secondary">Node.js</Badge>
										<Badge variant="secondary">TypeScript</Badge>
										<Badge variant="secondary">AWS</Badge>
										<Badge variant="secondary">Docker</Badge>
										<Badge variant="secondary">GraphQL</Badge>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<h3 className="text-lg font-semibold">Links</h3>
								</CardHeader>
								<CardContent className="space-y-2">
									<div className="flex items-center">
										<LinkIcon className="mr-2 h-4 w-4 text-muted-foreground" />
										<a
											href="#"
											className="text-sm text-blue-500 hover:underline"
										>
											github.com/johndoe
										</a>
									</div>
									<div className="flex items-center">
										<LinkIcon className="mr-2 h-4 w-4 text-muted-foreground" />
										<a
											href="#"
											className="text-sm text-blue-500 hover:underline"
										>
											linkedin.com/in/johndoe
										</a>
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="activity" className="space-y-4">
							<Card>
								<CardHeader>
									<h3 className="text-lg font-semibold">Recent Activity</h3>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{[1, 2, 3].map((i) => (
											<div key={i} className="flex items-start space-x-4">
												<Activity className="h-5 w-5 text-muted-foreground mt-0.5" />
												<div>
													<p className="text-sm">
														Updated the project documentation
													</p>
													<span className="text-xs text-muted-foreground">
														2 hours ago
													</span>
												</div>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="settings" className="space-y-4">
							<Card>
								<CardHeader>
									<h3 className="text-lg font-semibold">Profile Settings</h3>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="name">Name</Label>
										<Input id="name" defaultValue="John Doe" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="email">Email</Label>
										<Input
											id="email"
											type="email"
											defaultValue="john.doe@example.com"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="bio">Bio</Label>
										<Input
											id="bio"
											defaultValue="Senior Developer at TechCorp Inc."
										/>
									</div>
									<Button>
										<Settings className="mr-2 h-4 w-4" />
										Save Changes
									</Button>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
}
