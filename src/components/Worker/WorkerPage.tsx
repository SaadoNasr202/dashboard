// pages/KaidhaPage.tsx (or wherever your KaidhaPage component is)
"use client";
import { WorkerFormData } from "@/lib/types/dataForm";
import { useEffect, useState } from "react";
import { WorkerTable } from "./WorkerTable";

export default function WorkerPage({
	getWorkersDataAction,
}: {
	getWorkersDataAction: () => Promise<
		{ data: WorkerFormData[] } | { error: string } | undefined
	>;
}) {
	const [data, setData] = useState<WorkerFormData[] | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await getWorkersDataAction();
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
	}, [getWorkersDataAction]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div>
			{data && data.length > 0 ? (
				<WorkerTable data={data} />
			) : (
				<div>No data found.</div>
			)}
		</div>
	);
}
