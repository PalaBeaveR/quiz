import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { questions } from "$lib/questions";

export const GET:RequestHandler = (e) => {
	return json(questions)
}
