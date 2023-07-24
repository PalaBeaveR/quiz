import { QuizEvent, event, users } from "$lib/users";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
	let username = await request.json()

	for (const user of users.keys()) {
		if (user.name == username) {
			user.last_heartbeat = Date.now()
			if (user.missing_heartbeats > 0) {
				user.missing_heartbeats = 0
				event.sendToAll(QuizEvent.LobbyUpdate, { users: Array.from(users.keys()) })
			} else {

				user.missing_heartbeats = 0
			}
			break
		}
	}
	return new Response()
}
