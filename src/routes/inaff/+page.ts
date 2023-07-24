import type { User } from '$lib/users';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	return {
	    users: (await (await fetch("/api/users", {
		method: "POST"
	})).json()).users as User[]};
};
