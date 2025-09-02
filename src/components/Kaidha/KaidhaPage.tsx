// pages/KaidhaPage.tsx (or wherever your KaidhaPage component is)
"use client";
import { KaidhaTable } from "@/components/Kaidha/KaidhaTable"; // Import the new component
import { KaidhaFormData } from "@/lib/types/dataForm";
import { useEffect, useState } from "react";

export default function KaidhaPage({
	KaidhaGetDataAction,
}: {
	KaidhaGetDataAction: () => Promise<
		{ data: KaidhaFormData[] } | { error: string } | undefined
	>;
}) {
	const [data, setData] = useState<KaidhaFormData[] | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await KaidhaGetDataAction();
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
	}, [KaidhaGetDataAction]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div>
			{data && data.length > 0 ? (
				<KaidhaTable data={data} />
			) : (
				<div>No data found.</div>
			)}
		</div>
	);
}
