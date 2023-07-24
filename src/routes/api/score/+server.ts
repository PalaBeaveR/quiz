import { QuizEvent, event, users } from "$lib/users";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({request}) => {
	const {username, score} = await request.json()

	for (const user of users.keys()) {
		if (user.name == username) {
			user.score = score
			event.sendToAll(QuizEvent.LobbyUpdate,  {
				users: Array.from(users.keys())
			})
			break
		}
	}

	return new Response()
}
