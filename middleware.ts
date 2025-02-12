import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	// Retrieve the token from the cookies
	const token = request.cookies.get("token")?.value;

	if (!token) {
		// If the token doesn't exist, redirect to the login page
		return NextResponse.redirect(new URL("/login", request.url));
	}

	try {
		const response = await fetch("http://localhost:3000/auth/validate", {
			headers: {
				Cookie: `token=${token}`,
			},
		});

		if (response.ok) {
			console.log(token);
			return NextResponse.next();
		} else {
			console.log("Response failed:", token);
			return NextResponse.redirect(new URL("/login", request.url));
		}
	} catch (error) {
		console.error("Error during authentication:", error);
		// In case of an error, redirect to the login page
		return NextResponse.redirect(new URL("/login", request.url));
	}
}

// Apply middleware to protected routes
export const config = {
	matcher: ["/", "/profile"], // adjust to match your protected routes
};
