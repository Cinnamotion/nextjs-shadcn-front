export interface User {
	id?: number;
	username: string;
	email: string;
	password_hash: string;
	first_name?: string;
	last_name?: string;
	created_at?: Date;
	updated_at?: Date;
	is_active?: boolean;
	role?: "user" | "admin";
}
