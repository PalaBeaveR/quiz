import { users } from "$lib/users";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types"

export const POST: RequestHandler = async ({request}) => {
    return json(users.map((v) => v.name))
}
