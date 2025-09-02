import KaidhaPage from "@/components/Kaidha/KaidhaPage";
import { getUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { TB_KaidhaUsers } from "@/lib/schema";
import { KaidhaFormData } from "@/lib/types/dataForm";

export default function Kaidha() {
	return (
		<div>
			<KaidhaPage KaidhaGetDataAction={KaidhaGetDataAction} />
		</div>
	);
}

async function KaidhaGetDataAction(): Promise<
	{ data: KaidhaFormData[] } | { error: string } | undefined
> {
	"use server";
	try {
		const user = await getUser();
		if (!user) {
			return;
		}
		const dataWithId = await db.select().from(TB_KaidhaUsers);
		console.log("data: " + dataWithId);

		if (!dataWithId) {
			return;
		}

		const data = dataWithId.map(({ id, ...rest }) => rest);
		return { data: data as KaidhaFormData[] };
	} catch (error) {
		if (error instanceof Error) {
			const errorMessage = error.message;
			return { error: errorMessage };
		}
		return;
	}
}
