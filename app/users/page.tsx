"use client";
import React, { useEffect, useState } from "react";

export default function Users() {
	const [users, setUsers] = useState([]);

	const fetchUsers = async () => {
		const response = await fetch("http://localhost:3000/users");
		if (response.ok) {
			const data = await response.json();
			setUsers(data);
			console.log(data);
			alert("You got the users!");
		} else {
			alert("Couldn't get users data");
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<div>
			{users.map((user) => (
				<div key={user.id}>
					<p>Email: {user.email}</p>
					<p>Pasword: {user.password}</p>
				</div>
			))}
		</div>
	);
}
