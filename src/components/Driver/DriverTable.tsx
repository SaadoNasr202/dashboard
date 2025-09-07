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
import Image from "next/image";

export function DriverTable({ data }: { data: DeliveryDriverFormData[] }) {
	if (!data || data.length === 0) {
		return <p>No data to display in the table.</p>;
	}

	const headers = Object.keys(data[0]);

	// الحقول يلي لازم تعرض صور
	const imageFields = ["idImage", "idDriver", "idVichle", "Picture"];

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
						{headers.map((header) => {
							const value = item[header as keyof DeliveryDriverFormData];

							return (
								<TableCell key={header}>
									{imageFields.includes(header) && value ? (
										<div className="relative h-20 w-20">
											<Image
												src={value as string}
												alt={`${header} image`}
												fill
												style={{ objectFit: "contain" }}
												sizes="(max-width: 768px) 100vw, 50vw"
											/>
										</div>
									) : typeof value === "string" || typeof value === "number" ? (
										value
									) : (
										JSON.stringify(value)
									)}
								</TableCell>
							);
						})}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
