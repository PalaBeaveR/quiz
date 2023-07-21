import { users } from "$lib/users";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({request}) => {
    const info = await request.json()
    if (!info.username) return new Response()
    
	
    let user = users.find((u) => u.name == info.username)
    if (!user) return new Response()
    user.heartbeat = Date.now()

    return new Response();
}
