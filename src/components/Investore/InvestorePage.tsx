"use client";

import { InvestoreFormData } from "@/lib/types/dataForm";
import { useEffect, useState } from "react";
import { InvestoreTable } from "./InvestoreTable";

export default function InvestorePage({
	getInvestorsDataAction,
}: {
	getInvestorsDataAction: () => Promise<
		{ data: InvestoreFormData[] } | { error: string } | undefined
	>;
}) {
	const [data, setData] = useState<InvestoreFormData[] | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getInvestorsDataAction();
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
	}, [getInvestorsDataAction]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div>
			{data && data.length > 0 ? (
				<InvestoreTable data={data} />
			) : (
				<div>No data found.</div>
			)}
		</div>
	);
}
