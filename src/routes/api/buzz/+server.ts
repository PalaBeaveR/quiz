import { BuzzerState, QuizEvent, UserType, event, users } from "$lib/users";
import type { RequestHandler } from "./$types";

let BUZZED = false

export const POST: RequestHandler = async ({ request }) => {
	const old_buzz = BUZZED
	BUZZED = true
	const username = await request.json()

	for (const user of users.keys()) {
		if (user.name == username && user.buzzer == BuzzerState.Reset) {
			user.buzzer = old_buzz ? BuzzerState.Late : BuzzerState.First
			event.sendToAll(QuizEvent.LobbyUpdate, {
				users: Array.from(users.keys())
			})

			event.sendToAll(QuizEvent.Buzz, "")
			break
		}
	}

	return new Response()
}

export const DELETE: RequestHandler = (e) => {
	BUZZED = false
	for (const user of users.keys()) {
		user.buzzer = BuzzerState.Reset
	}

	event.sendToAll(QuizEvent.LobbyUpdate, {
		users: Array.from(users.keys())
	})

	return new Response()
}
