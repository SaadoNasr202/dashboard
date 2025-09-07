// src/app/page.tsx
"use client";

import HomePage from "@/components/HomePage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function checkLoginStatus() {
			try {
				const response = await fetch("/api/is_logged_in", {
					credentials: "include", // ضروري لحتى يبعث الكوكي
				});

				if (!response.ok) {
					router.push("/login");
					return;
				}

				const data = await response.json();

				if (data.isLoggedIn) {
					setIsLoading(false);
				} else {
					router.push("/login");
				}
			} catch (error) {
				console.error("Login check failed:", error);
				router.push("/login");
			}
		}

		checkLoginStatus();
	}, [router]);

	if (isLoading) return <div>Loading...</div>;

	return (
		<div>
			<h1 className="flex justify-center text-3xl md:text-4xl"></h1>
			<HomePage />
		</div>
	);
}
