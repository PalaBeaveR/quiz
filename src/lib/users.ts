export let users: User[] = []

export enum Event {
	Join = "playerjoined",
	HeartBeat = "heartbeat",
	Left = "Left",
	YourUsername = "YourUsername",
	ChangeName = "ChangeName"
}

export class User {
	name: string;
	writer: WritableStreamDefaultWriter;
	heartbeat: number;

	constructor(name: string, writer: WritableStreamDefaultWriter) {
		this.name = name
		this.writer = writer
		this.heartbeat = Date.now()
	}
}

export function sendToAll(event: Event, data: object) {
	for (const user of users) {
		user.writer.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`).catch(() => { })
	}

}


export function sendTo(user: User, event: Event, data: object) {
	user.writer.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`).catch(() => { })

}

export function filterDead() {
	for (let i = users.length - 1; i >= 0; i--) {
		let interval = Date.now() - users[i].heartbeat
		if (interval > 10 * 1000) {
			let user = users.splice(i)[0]
			console.log(`User "${user.name}" died with heartbeat interval of ${interval}ms`)
			sendToAll(Event.Left, { name: user.name })
		}
	}

}
