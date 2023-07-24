import { QuizEvent, event, users } from "$lib/users";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({request}) => {
	const question = await request.json()

	event.sendToAll(QuizEvent.Question, question)
	return new Response()

}

export const DELETE: RequestHandler = (e) => {
	for(const user of users.keys()) {
		user.answer = ""
	}

	event.sendToAll(QuizEvent.LobbyUpdate, {
		users: Array.from(users.keys())
	})

	return new Response()
}
