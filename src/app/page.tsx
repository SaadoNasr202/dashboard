import HomePage from "@/components/HomePage";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
	return (
		<div>
			<HomePage logoutAction={logoutAction} />
		</div>
	);
}
export async function logoutAction() {
	"use server";

	const sessionCookie = cookies().get(lucia.sessionCookieName);
	if (sessionCookie) {
		await lucia.invalidateSession(sessionCookie.value);
		cookies().set({
			name: lucia.sessionCookieName,
			value: "",
			expires: new Date(0),
		});
	}
	redirect("/login");
}
