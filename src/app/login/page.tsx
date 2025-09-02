import { LoginForm } from "@/components/LoginForm";
import { lucia } from "@/lib/auth";
import { db } from "@/lib/db";
import { TB_user } from "@/lib/schema";
import { LoginFormError, loginFormSchema } from "@/lib/types/authSchemas";
import hash from "@/lib/utils";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { z } from "zod";

// export const metadata: Metadata = {
// 	title: "SQLMentor - Login",
// 	icons: {
// 		icon: "/logo.ico",
// 		apple: "/logo.png",
// 	},
// };

export default function LoginPage() {
	return <LoginForm loginAction={LoginAction} />;
}

async function LoginAction(
	input: z.infer<typeof loginFormSchema>,
): Promise<LoginFormError | undefined | { field: string; message: string }> {
	"use server";
	try {
		const data = await loginFormSchema.parseAsync(input);

		const user = await db
			.select()
			.from(TB_user)
			.where(eq(TB_user.username, data.username));

		if (!user) {
			return { field: "username", message: "Username not found" };
		}
		if (user[0].password !== hash(data.password)) {
			return { field: "password", message: "Incorrect password" };
		}
		const session = await lucia.createSession(user[0].id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		);
	} catch (e) {
		return {
			field: "root",
			message: "An unexpected error occurred, please try again later",
		};
	}
}
