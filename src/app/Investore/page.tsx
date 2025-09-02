import { getUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { TB_Investore } from "@/lib/schema";
import { InvestoreFormData } from "@/lib/types/dataForm";

export default function InveStore() {
	return (
		<div>
			<div>e</div>
		</div>
	);
}

async function getInvestorsDataAction(): Promise<
	{ data: InvestoreFormData[] } | { error: string } | undefined
> {
	"user server";
	try {
		const user = await getUser();
		if (!user) {
			return;
		}
		const dataWithId = await db.select().from(TB_Investore);
		if (!dataWithId) {
			return;
		}

		const data = dataWithId.map(({ id, ...rest }) => rest);

		return { data: data as InvestoreFormData[] };
	} catch (error: unknown) {
		if (error instanceof Error) {
			return { error: error.message };
		}
		return { error: "An unknown error occurred." };
	}
}
