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
import { DeliveryDriverFormData } from "@/lib/types/dataForm";

export function DriverTable({ data }: { data: DeliveryDriverFormData[] }) {
	if (!data || data.length === 0) {
		return <p>No data to display in the table.</p>;
	}

	// Get the keys from the first object to use as table headers dynamically
	const headers = Object.keys(data[0]);

	return (
		<Table>
			<TableCaption>A list of Driver data entries.</TableCaption>
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
								{JSON.stringify(item[header as keyof DeliveryDriverFormData])}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
