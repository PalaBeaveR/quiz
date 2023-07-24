import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { users } from "$lib/users";

export const POST: RequestHandler = (e) => {
    return json({
	users: Array.from(users.keys())
    })
}
