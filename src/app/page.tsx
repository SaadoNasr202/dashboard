// src/app/page.tsx
import HomePage from "@/components/HomePage";
import { validateRequest } from "@/lib/action";
import { redirect } from "next/navigation";

export default async function Home() {
	const { user } = await validateRequest();

	if (!user) {
		redirect("/login");
	}

	return (
		<div>
			<h1 className="flex justify-center text-5xl">
				Welcome, M.R {user.username}
			</h1>
			<HomePage />
		</div>
	);
}
