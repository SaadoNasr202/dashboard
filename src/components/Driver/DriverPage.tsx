"use client";

import { DeliveryDriverFormData } from "@/lib/types/dataForm";
import { useEffect, useState } from "react";
import { DriverTable } from "./DriverTable";

export default function DriverPage({
	getDeliveryDriversDataAction,
}: {
	getDeliveryDriversDataAction: () => Promise<
		{ data: DeliveryDriverFormData[] } | { error: string } | undefined
	>;
}) {
	const [data, setData] = useState<DeliveryDriverFormData[] | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getDeliveryDriversDataAction();
				if (result && "data" in result) {
					setData(result.data);
				} else if (result && "error" in result) {
					setError(result.error);
				}
			} catch (err) {
				setError("An unexpected error occurred.");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [getDeliveryDriversDataAction]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div>
			{data && data.length > 0 ? (
				<DriverTable data={data} />
			) : (
				<div>No data found.</div>
			)}
		</div>
	);
}
