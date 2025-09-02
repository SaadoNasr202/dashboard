"use client";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const cardsData = [
	{ title: "Kaidha Users", path: "/Kaidha" },
	{ title: "Store Users", path: "/Partner" },
	{ title: "Investore users", path: "/Investore" },
	{ title: "Delevery users", path: "/DeliveryDrivers" },
	{ title: "Worker users", path: "/Worker" },
];

export default function HomePage() {
	const router = useRouter();
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
