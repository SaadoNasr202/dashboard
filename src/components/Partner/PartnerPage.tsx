// pages/KaidhaPage.tsx (or wherever your KaidhaPage component is)
"use client";
import { PartnerFormData } from "@/lib/types/dataForm";
import { useEffect, useState } from "react";
import { PartnerTable } from "./PartnerTable";

export default function PartnerPage({
	getPartnersDataAction,
}: {
	getPartnersDataAction: () => Promise<
		{ data: PartnerFormData[] } | { error: string } | undefined
	>;
}) {
	const [data, setData] = useState<PartnerFormData[] | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getPartnersDataAction();
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
	}, [getPartnersDataAction]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div>
			{data && data.length > 0 ? (
				<PartnerTable data={data} />
			) : (
				<div>No data found.</div>
			)}
		</div>
	);
}
