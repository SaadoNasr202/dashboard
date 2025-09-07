// src/app/page.tsx
import HomePage from "@/components/HomePage";

export default async function Home() {
	return (
		<div>
			<h1 className="flex justify-center text-3xl md:text-4xl"></h1>
			<HomePage />
		</div>
	);
}

