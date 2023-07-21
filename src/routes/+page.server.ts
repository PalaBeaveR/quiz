import type { Actions } from './$types';
import { Event, sendTo, sendToAll, users } from '$lib/users';

export const actions: Actions = {
    register: async ({request}) => {
	const data = await request.formData()
	const name = data.get("name")
	const old = data.get("old")

	if (!name || !old) return


	let user = users.find((u) => u.name == old)
	if (!user) return {success: false}
	user.name = name.toString()

	sendToAll(Event.ChangeName, {old: data.get("old"), new: data.get("name")})
	sendTo(user, Event.YourUsername, {username: data.get("name")})

	return {
	    success: true
	}
    }
}
