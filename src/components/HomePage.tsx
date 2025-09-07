"use client";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const cardsData = [
	{ title: "Kaidha Users", path: "/Kaidha" },
	{ title: "Store Users", path: "/Partner" },
	{ title: "Investore users", path: "/Investore" },
	{ title: "Delevery users", path: "/DeliveryDrivers" },
	{ title: "Worker users", path: "/Worker" },
];

export default function HomePage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function checkLoginStatus() {
			try {
				const response = await fetch("/api/is_logged_in");

				if (!response.ok) {
					console.error("Failed to fetch login status:", response.statusText);
					setIsLoading(false);
					return;
				}

				const data = await response.json();
				if (data.isLoggedIn) {
					router.push("/");
				} else {
					setIsLoading(false);
				}
			} catch (error) {
				console.error("An error occurred while checking login status:", error);
				setIsLoading(false);
			}
		}

		checkLoginStatus();
	}, [router]);
	return (
		<div className="grid h-full grid-cols-1 gap-6 p-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
			{cardsData.map((card) => (
				<Card key={card.path} className="w-full">
					<CardHeader>
						<CardTitle className="text-xl">{card.title}</CardTitle>
					</CardHeader>
					<CardFooter className="flex-col gap-2">
						<Button
							onClick={() => {
								router.push(card.path);
							}}
							variant="outline"
							className="w-full"
						>
							Open
						</Button>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
