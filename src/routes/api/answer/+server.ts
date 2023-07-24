import { QuizEvent, UserType, event, users } from "$lib/users";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = (e) => {
	for (const user of users.keys()) {
		if (user.type == UserType.Player) {
			event.sendTo(user, QuizEvent.Answer, "")
		}
	}

	return new Response()
}


export const POST: RequestHandler = async ({request}) => {
	const form = await request.formData()
	const username = form.get("username")
	const answer = form.get("answer")
	console.log(username, answer)
	for (const user of users.keys()) {
		if (user.name == username) {
			user.answer = answer
			event.sendToAll(QuizEvent.LobbyUpdate, {
				users: Array.from(users.keys())
			})
			break
		}
	}

	return json({status: 200})
}
