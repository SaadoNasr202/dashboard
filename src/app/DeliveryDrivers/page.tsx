import { getUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { TB_DeliveryDrivers } from "@/lib/schema";
import { DeliveryDriverFormData } from "@/lib/types/dataForm";

export default function DeliveryDrivers() {
	return (
		<div>
			<div>e</div>
		</div>
	);
}

async function getDeliveryDriversDataAction(): Promise<
	{ data: DeliveryDriverFormData[] } | { error: string } | undefined
> {
	"user server";
	try {
		const user = await getUser();
		if (!user) {
			return;
		}
		const dataWithId = await db.select().from(TB_DeliveryDrivers);
		if (!dataWithId) {
			return;
		}

		const data = dataWithId.map(({ id, ...rest }) => rest);

		return { data: data as DeliveryDriverFormData[] };
	} catch (error: unknown) {
		if (error instanceof Error) {
			return { error: error.message };
		}
		return { error: "An unknown error occurred." };
	}
}
