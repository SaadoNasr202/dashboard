import PartnerPage from "@/components/Partner/PartnerPage";
import { getUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { TB_Partner } from "@/lib/schema";
import { PartnerFormData } from "@/lib/types/dataForm";

export default function Partner() {
	return (
		<div>
			<PartnerPage getPartnersDataAction={getPartnersDataAction} />
		</div>
	);
}
async function getPartnersDataAction(): Promise<
	{ data: PartnerFormData[] } | { error: string } | undefined
> {
	"use server";
	try {
		const user = await getUser();
		if (!user) {
			return;
		}
		const dataWithId = await db.select().from(TB_Partner);
		if (!dataWithId) {
			return;
		}

		const data = dataWithId.map(({ id, ...rest }) => rest);

		return { data: data as PartnerFormData[] };
	} catch (error: unknown) {
		if (error instanceof Error) {
			return { error: error.message };
		}
		return { error: "An unknown error occurred." };
	}
}
