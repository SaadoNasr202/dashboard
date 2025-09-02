"use client";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

// Define the data for the cards in a clear, separate array.
const cardsData = [
	{ title: "Kaidha Users", path: "/Kaidha" },
	{ title: "Store Users", path: "/Partner" },
	{ title: "Investore users", path: "/Investore" },
	{ title: "Delevery users", path: "/DeliveryDrivers" },
	{ title: "Worker users", path: "/Worker" },
];

export default function HomePage({
	logoutAction,
}: {
	logoutAction: () => Promise<void>;
}) {
	const router = useRouter();

	const handleLogout = async () => {
		await logoutAction();
	};

	return (
		<div className="flex h-full flex-row items-center justify-center gap-6 p-9 text-3xl">
			{/* Use the map function to dynamically render the cards from the array */}
			{cardsData.map((card) => (
				<Card key={card.path} className="w-full max-w-sm">
					<CardHeader>
						<CardTitle>{card.title}</CardTitle>
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
