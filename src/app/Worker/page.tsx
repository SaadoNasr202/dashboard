import { getUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { TB_Worker } from "@/lib/schema";
import { WorkerFormData } from "@/lib/types/dataForm";

export default function Worker() {
	return (
		<div>
			<div>e</div>
		</div>
	);
}
async function getWorkersDataAction(): Promise<
	{ data: WorkerFormData[] } | { error: string } | undefined
> {
	"user server";
	try {
		const user = await getUser();
		if (!user) {
			return;
		}
		const dataWithId = await db.select().from(TB_Worker);
		if (!dataWithId) {
			return;
		}

		const data = dataWithId.map(({ id, ...rest }) => rest);

		return { data: data as WorkerFormData[] };
	} catch (error: unknown) {
		if (error instanceof Error) {
			return { error: error.message };
		}
		return { error: "An unknown error occurred." };
	}
}
