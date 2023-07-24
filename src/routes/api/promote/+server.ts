import { QuizEvent, UserType, event, users } from "$lib/users";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({request}) => {
	const username = await request.json()

	for (const user of users.keys()) {
		if (user.name == username) {
			user.type = UserType.Player
			event.sendToAll(QuizEvent.LobbyUpdate, {
				users: Array.from(users.keys())
			})
			event.sendTo(user, QuizEvent.You, user)
			break
		}
	}

	return new Response()
}
