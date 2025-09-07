"use server";
import { cookies } from "next/headers";
import { lucia } from "./auth";

export const validateRequest = async () => {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
	if (!sessionId) {
		return { user: null, session: null };
	}
	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie);
	}
	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		cookies().set(sessionCookie);
	}
	return { user, session };
};
	