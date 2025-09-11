export interface KaidhaFormData {
	firstName: string | null;
	lastName: string | null;
	fatherName: string | null;
	grandFatherName: string | null;
	birthDate: string | null;
	nationality: string | null;
	socialStatus: string | null;
	familyMembersCount: string | null;
	idType: string | null;
	personalIdNumber: string | null;
	idExpirationDate: string | null;
	phoneNumber: string | null;
	whatsappNumber: string | null;
	email: string | null;
	homeType: string | null;
	homeNature: string | null;
	city: string | null;
	neighborhood: string | null;
	addressDetails: string;
	agreed: boolean | null;
	companyName: string | null;
	jobTitle: string | null;
	yearsOfExperience: string | null;
	grossSalary: string | null;
	workAddress: string | null;
	locationhouse: string | null;
	locationwork: string | null;
	Installments: string | null;
	hasAdditionalIncome: string | null;
	additionalAmount: string | null;
	incomeSource: string | null;
}

export interface PartnerFormData {
	id: string;
	storeName: string;
	storeClassification: string | null;
	whatYourStoreOffers: string | null;
	city: string | null;
	branchCount: string | null;
	phoneNumber: string | null;
	englishStoreName: string | null;
	personalIdNumber: string | null;
	detailedAddress: string | null;
	idImage: string | null;
	Municipallicense: string | null;
	Storefrontimage: string | null;
	location: string | null;
	agreed: boolean | null;
}

export interface DeliveryDriverFormData {
	id: string;
	firstName: string;
	lastName: string;
	deliveryType: string;
	vehicleType: string;
	idType: string;
	personalIdNumber: string;
	email: string | null;
	region: string;
	idImage: string | null;
	idDriver: string | null;
	idVichle: string | null;
	Picture: string | null;
	agreed: boolean;
}
export interface InvestoreFormData {
	id: string;
	first_name: string;
	father_name: string;
	family_name: string;
	grandfather_name: string;
	birth_date: Date | null;
	national_id: string;
	email: string | null;
	phone: string;
	national_address_email: string | null;
	region: string;
	iban: string;
	bank_name: string;
	amount: string | null; // Drizzle's numeric type is often handled as a string
	agreed: boolean;
}
export interface WorkerFormData {
	id: string;
	firstName: string;
	lastName: string;
	deliveryType: string;
	vehicleType: string;
	idType: string;
	personalIdNumber: string;
	email: string | null;
	region: string;
	idImage: string | null;
	Picture: string | null;
	agreed: boolean;
}
