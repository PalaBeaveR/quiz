export enum UserType {
	Player,
	Spectator
}

export enum BuzzerState {
	Reset,
	Late,
	First
}


export enum QuizEvent {
	LobbyUpdate = "lobbyupdate",
	You = "newusername",
	HeartBeat = "heartbeat",
	Buzz = "buzz",
	Question = "question",
	Answer = "answer"
}

export class User {
	name: string;
	type: UserType;
	missing_heartbeats: number;
	last_heartbeat: number;
	score: number;
	buzzer: BuzzerState;
	answer: string;

	constructor(name: string, type: UserType) {
		this.name = name
		this.type = type
		this.missing_heartbeats = 0
		this.last_heartbeat = Date.now()
		this.score = 0
		this.buzzer = BuzzerState.Reset
		this.answer = ""
	}
}

export let users: Map<User, WritableStreamDefaultWriter> = new Map()

export const event = {
	sendTo(user: User, event: QuizEvent, data: any) {
		users.get(user)?.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`).catch(() => { })
	},
	sendToAll(ev: QuizEvent, data: any) {
		for (const [user, _] of users) {
			event.sendTo(user, ev, data)
		}
	}
}
