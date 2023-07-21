import { Event, User, filterDead, sendTo, sendToAll, users } from "$lib/users";
import type { RequestHandler } from "@sveltejs/kit";


var ANON_NUM = 0

var HEARTBEAT = setInterval(() => {
	filterDead()
	for (const user of users) {
		sendTo(user, Event.HeartBeat, { aight: "OK" })
	}
}, 5000)

export const GET: RequestHandler = async ({ cookies }) => {
	const { readable, writable } = new TransformStream()


	const writer = writable.getWriter()
	const username = `Anon${ANON_NUM}`
	ANON_NUM += 1
	const user = new User(username, writer);
	sendTo(user, Event.YourUsername, { username })
	sendToAll(Event.Join, { username })
	users.push(user)


	return new Response(readable, {
		headers: {
			// Denotes the response as SSE
			'Content-Type': 'text/event-stream',
			// Optional. Request the GET request not to be cached.
			'Cache-Control': 'no-cache',
			Connection: 'keep-alive'

		}
	})
}
