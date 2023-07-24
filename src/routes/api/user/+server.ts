import { QuizEvent, event, users } from "$lib/users"
import type { RequestHandler } from "./$types"

export const PATCH: RequestHandler = async ({request}) => {
	const {old_username, new_username} = await request.json()

	for (const user of users.keys()) {
		if(user.name == old_username) {
			user.name = new_username
			event.sendToAll(QuizEvent.LobbyUpdate, {
				users: Array.from(users.keys())
			})
			event.sendTo(user, QuizEvent.You, user)
		}
	} 

	return new Response()
}
