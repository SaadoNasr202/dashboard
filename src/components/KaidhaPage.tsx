"use client";
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
			<h1>Kaidha Data</h1>

			{data && data.length > 0 ? (
				<ul>
					{data.map((item, index) => (
						<li
							key={index}
							style={{
								border: "1px solid #ccc",
								margin: "10px",
								padding: "10px",
							}}
						>
							{Object.entries(item).map(([key, value]) => (
								<p key={key}>
									<strong>{key}:</strong> {JSON.stringify(value)}
								</p>
							))}
						</li>
					))}
				</ul>
			) : (
				<div>No data found.</div>
			)}
		</div>
	);
}
