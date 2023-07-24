import { QuizEvent, User, UserType, event, users } from "$lib/users";
import type { RequestHandler } from "./$types";

let ANON_AMOUNT = 0

let HEARTBEAT: number | null = null
let LAST_HEARTBEAT = 0
const HEARTBEAT_INTERVAL = 10000;

export const GET: RequestHandler = () => {
	let { writable, readable } = new TransformStream();


	const username = `Anon ${ANON_AMOUNT}`;
	const user = new User(username, UserType.Spectator)
	users.set(user, writable.getWriter())
	ANON_AMOUNT += 1

	event.sendTo(user, QuizEvent.You, user)
	event.sendToAll(QuizEvent.LobbyUpdate, {
		users: Array.from(users.keys())
	})

	console.log(`User ${username} is now listening to events`)

	if (HEARTBEAT == null) {
		LAST_HEARTBEAT = Date.now()
		HEARTBEAT = setInterval(() => {
			let need_refresh = false
			for (const user of users.keys()) {
				if (user.missing_heartbeats >= 2) {
					need_refresh = true
					users.delete(user)
					console.log(`User ${user.name} has been declared dead`)
					continue
				}
				if (user.last_heartbeat < LAST_HEARTBEAT) {
					need_refresh = true
					user.missing_heartbeats += 1
					console.log(`User ${user.name} has missed a heartbeat`)
				}
			}

			if (users.size == 0) {
				clearInterval(HEARTBEAT as number)
				HEARTBEAT = null
				ANON_AMOUNT = 0
				return
			}
			
			LAST_HEARTBEAT = Date.now()
			event.sendToAll(QuizEvent.HeartBeat, "")

			if (need_refresh) {
				event.sendToAll(QuizEvent.LobbyUpdate, { users: Array.from(users.keys()) })
			}
		}, HEARTBEAT_INTERVAL)
	}


	return new Response(readable, {
		headers: {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
		}
	})
}
