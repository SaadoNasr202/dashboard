// components/KaidhaTable.tsx
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { WorkerFormData } from "@/lib/types/dataForm";

export function WorkerTable({ data }: { data: WorkerFormData[] }) {
	if (!data || data.length === 0) {
		return <p>No data to display in the table.</p>;
	}

	// Get the keys from the first object to use as table headers dynamically
	const headers = Object.keys(data[0]);

	return (
		<Table>
			<TableCaption>A list of Worker data entries.</TableCaption>
			<TableHeader>
				<TableRow>
					{headers.map((header) => (
						<TableHead key={header} className="capitalize">
							{header}
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((item, index) => (
					<TableRow key={index}>
						{headers.map((header) => (
							<TableCell key={header}>
								{typeof item[header as keyof WorkerFormData] === "string" ||
								typeof item[header as keyof WorkerFormData] === "number"
									? item[header as keyof WorkerFormData]
									: JSON.stringify(item[header as keyof WorkerFormData])}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
