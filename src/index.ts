/**
 * TypeScript types for the Random Profiles API.
 *
 * These mirror the JSON shapes returned by the public API at
 * https://random-profiles.com/v1/*. They are intentionally decoupled from
 * the server implementation so this package has zero runtime dependencies.
 *
 * @example
 *   import type { Profile, Company, ProfilesResponse } from "random-profiles-types";
 *
 *   const res = await fetch("https://random-profiles.com/v1/profiles?count=5", {
 *     headers: { "X-API-Key": "rp_..." },
 *   });
 *   const { profiles }: ProfilesResponse = await res.json();
 */

// ─── Enumerations ───────────────────────────────────────────────────────

/** Country codes supported by the API (ISO 3166-1 alpha-2). */
export type CountryCode =
	| "US"
	| "GB"
	| "DE"
	| "FR"
	| "AU"
	| "BR"
	| "JP"
	| "IN"
	| "NG";

/** Subscription tiers. */
export type Tier = "free" | "pro" | "unlimited";

/** Gender filter values. */
export type Gender = "male" | "female" | "non-binary";

/** Valid image / photo / logo size variants in pixels. */
export type ImageSize = "64" | "128" | "256" | "512" | "1024";

/** Available image encodings. WebP is ~30% smaller than JPG with broad support. */
export type ImageFormat = "jpg" | "webp";

/** Company employee-count brackets. */
export type CompanySize =
	| "1-10"
	| "11-50"
	| "51-200"
	| "201-500"
	| "501-1000"
	| "1001-5000"
	| "5000+";

/** Industries available on `/v1/companies`. */
export type Industry =
	| "Technology"
	| "Healthcare"
	| "Finance"
	| "Education"
	| "Manufacturing"
	| "Retail"
	| "Media"
	| "Consulting"
	| "Real Estate"
	| "Transportation"
	| "Energy"
	| "Telecommunications"
	| "Hospitality"
	| "Agriculture"
	| "Legal"
	| "Construction";

/** Company legal structure. */
export type CompanyType = "private" | "public" | "nonprofit";

/** Company lifecycle state. */
export type CompanyStatus = "active" | "acquired" | "defunct";

/** Remote/in-office posture. */
export type RemotePolicy =
	| "remote-first"
	| "hybrid"
	| "on-site"
	| "distributed";

/** Target-market segmentation. */
export type TargetMarket =
	| "B2B"
	| "B2C"
	| "B2B2C"
	| "B2G"
	| "Enterprise"
	| "SMB";

/** Field groups selectable via `?fields=` on `/v1/profiles`. */
export type ProfileFieldGroup =
	| "name"
	| "email"
	| "phone"
	| "identity"
	| "bio"
	| "social"
	| "physical"
	| "job"
	| "address"
	| "financial"
	| "interests"
	| "education"
	| "photo"
	| "network"
	| "documents"
	| "vehicle"
	| "contact"
	| "digital"
	| "relationships"
	| "meta";

/** Field groups selectable via `?fields=` on `/v1/companies`. */
export type CompanyFieldGroup =
	| "name"
	| "industry"
	| "size"
	| "location"
	| "contact"
	| "social"
	| "financial"
	| "tech"
	| "leadership"
	| "legal"
	| "operations"
	| "product"
	| "relationships"
	| "meta";

// ─── Profiles ───────────────────────────────────────────────────────────

export interface ProfileName {
	prefix: string;
	first: string;
	middle: string;
	last: string;
	suffix: string | null;
	nickname: string | null;
}

export interface ProfileSocial {
	twitter: string;
	linkedin: string;
	github: string;
	instagram: string;
	facebook: string;
	tiktok: string;
	youtube: string;
}

export interface ProfilePhysical {
	height: number;
	weight: number;
	blood_type: string;
	eye_color: string;
	hair_color: string;
}

export interface ProfileJob {
	title: string;
	company: string;
	company_domain: string;
	department: string;
	industry: string;
	company_size: string;
	company_founded: number;
	job_type: string;
	salary: number;
	currency: string;
	annual_income: number;
	years_experience: number;
	start_date: string;
}

export interface ProfileAddress {
	street: string;
	line_2: string | null;
	city: string;
	state: string;
	county: string;
	zip: string;
	country: CountryCode;
	country_name: string;
	formatted: string;
	latitude: number;
	longitude: number;
	timezone: string;
}

export interface ProfileFinancial {
	credit_card: { number: string; type: string };
	iban: string;
	bank_name: string;
	credit_score: number;
	bitcoin_address: string;
	currency: string;
}

export interface ProfileEducation {
	degree: string;
	university: string;
	field_of_study: string;
	graduation_year: number;
	gpa: number;
}

export interface ProfileNetwork {
	ip_address: string;
	ipv6_address: string;
	user_agent: string;
	mac_address: string;
	domain_name: string;
}

export interface ProfileDocuments {
	ssn_last4: string;
	passport_number: string;
	drivers_license: string;
	national_id: string;
	tax_id: string;
}

export interface ProfileVehicle {
	make: string;
	model: string;
	year: number;
	license_plate: string;
}

export interface ProfileContact {
	phone_country_code: string;
	emergency_contact: {
		name: string;
		phone: string;
		relationship: string;
	};
}

export interface ProfileDigital {
	password_hash: string;
	api_token: string;
	ssh_public_key: string;
	two_factor_enabled: boolean;
	last_login: string;
	uuid_v4: string;
	date_of_death: string | null;
}

export interface ProfileRelationships {
	/** UUID of the company this profile works at; `null` if unemployed (~5%). */
	company_uuid: string | null;
	/** Up to 5 other profiles at the same company. Empty if unemployed or solo. */
	colleague_uuids: string[];
}

export interface ProfileMeta {
	created_at: string;
	updated_at: string;
	is_active: boolean;
	avatar_url: string;
	cover_color: string;
	locale: string;
}

/** A full profile returned from `/v1/profiles/{uuid}` or an entry in the list response. */
export interface Profile {
	uuid: string;
	name: ProfileName;
	gender: Gender;
	email: string;
	secondary_email: string;
	phone: string;
	phone_type: string;
	secondary_phone: string | null;
	fax: string | null;
	date_of_birth: string;
	age: number;
	zodiac_sign: string;
	ethnicity: string;
	dominant_hand: string;
	nationality: string;
	relationship_status: string;
	language: string;
	username: string;
	bio: string;
	website: string;
	social: ProfileSocial;
	physical: ProfilePhysical;
	job: ProfileJob;
	address: ProfileAddress;
	financial: ProfileFinancial;
	interests: string[];
	education: ProfileEducation;
	photo: string;
	avatar_url: string;
	network: ProfileNetwork;
	documents: ProfileDocuments;
	vehicle: ProfileVehicle;
	contact: ProfileContact;
	digital: ProfileDigital;
	relationships: ProfileRelationships;
	meta: ProfileMeta;
}

/** Response envelope for `GET /v1/profiles`. */
export interface ProfilesResponse {
	profiles: Profile[];
}

/** Query parameters accepted by `GET /v1/profiles`. */
export interface ProfilesQuery {
	count?: number;
	gender?: Gender;
	country?: string;
	exclude_country?: string;
	min_age?: number;
	max_age?: number;
	fields?: string;
	photo_size?: ImageSize;
	photo_format?: ImageFormat;
	seed?: number;
	format?: "json" | "csv";
}

// ─── Companies ──────────────────────────────────────────────────────────

export interface CompanySocial {
	twitter: string;
	linkedin: string;
	github: string;
	facebook: string;
	instagram: string;
	youtube: string;
	tiktok: string;
	mastodon: string;
	bluesky: string;
	crunchbase: string;
}

export interface CompanyLocationRef {
	city: string;
	country: CountryCode;
}

export interface CompanyLocation {
	street: string;
	city: string;
	state: string;
	county: string;
	zip: string;
	country: CountryCode;
	country_name: string;
	latitude: number;
	longitude: number;
	timezone: string;
	locations: CompanyLocationRef[];
}

export interface CompanyContact {
	phone: string;
	fax: string | null;
	toll_free: string | null;
	email: string;
	support_email: string;
	sales_email: string;
	press_email: string;
	website: string;
	languages: string[];
}

export interface FundingRound {
	round: string;
	amount: number;
	date: string;
	lead_investor: string;
}

export interface CompanyFinancial {
	revenue_range: string;
	revenue_usd: number;
	funding_total: number | null;
	valuation: number | null;
	market_cap: number | null;
	ebitda: number;
	profit_margin: number;
	currency: string;
	stock_ticker: string | null;
	ipo_date: string | null;
	last_round: string | null;
	investors: string[];
	funding_rounds: FundingRound[];
	fiscal_year_end: string;
}

export interface CompanyTech {
	tech_stack: string[];
	frontend: string[];
	backend: string[];
	database: string[];
	cloud: string[];
	analytics: string[];
	security_certifications: string[];
	api_docs_url: string;
	status_page_url: string;
}

export interface CompanyLeadership {
	ceo_name: string;
	ceo_email: string;
	cfo_name: string;
	cto_name: string;
	coo_name: string;
	founder_names: string[];
}

export interface CompanyLegal {
	tax_id: string;
	vat_number: string | null;
	duns_number: string;
	registration_number: string;
	lei: string;
	incorporation_state: string;
}

export interface CompanyOperations {
	status: CompanyStatus;
	is_active: boolean;
	parent_company: string | null;
	acquired_by: string | null;
	acquired_date: string | null;
	subsidiaries: string[];
	remote_policy: RemotePolicy;
}

export interface CompanyProduct {
	products: string[];
	services: string[];
	target_market: TargetMarket;
	customer_count: number;
	nps_score: number;
	competitors: string[];
}

export interface CompanyRelationships {
	/** Up to 30 profile UUIDs assigned to this company. Hydrate via /v1/profiles/{uuid}. */
	employee_uuids: string[];
}

export interface CompanyMeta {
	logo_url: string;
	avatar_url: string;
	cover_color: string;
	created_at: string;
	updated_at: string;
}

/** A full company returned from `/v1/companies/{uuid}` or an entry in the list response. */
export interface Company {
	uuid: string;
	name: string;
	legal_name: string;
	legal_form: string;
	slug: string;
	domain: string;
	description: string;
	tagline: string;
	industry: Industry;
	sub_industry: string;
	type: CompanyType;
	size: CompanySize;
	tags: string[];
	employees: number;
	founded_year: number;
	company_age: number;
	departments: string[];
	headcount_by_dept: Record<string, number>;
	board_size: number;
	location: CompanyLocation;
	contact: CompanyContact;
	social: CompanySocial;
	financial: CompanyFinancial;
	tech: CompanyTech;
	leadership: CompanyLeadership;
	legal: CompanyLegal;
	operations: CompanyOperations;
	product: CompanyProduct;
	relationships: CompanyRelationships;
	meta: CompanyMeta;
}

/** Response envelope for `GET /v1/companies`. */
export interface CompaniesResponse {
	companies: Company[];
}

/** Query parameters accepted by `GET /v1/companies`. */
export interface CompaniesQuery {
	count?: number;
	industry?: Industry;
	country?: string;
	size?: string;
	fields?: string;
	logo_size?: ImageSize;
	logo_format?: ImageFormat;
	seed?: number;
	format?: "json" | "csv";
}

// ─── Billing / usage ────────────────────────────────────────────────────

export interface UsageBucket {
	daily_used: number;
	/** `null` means unlimited tier. */
	daily_limit: number | null;
}

/** Response envelope for `GET /v1/billing/usage`. */
export interface UsageResponse {
	tier: Tier;
	profiles: UsageBucket;
	images: UsageBucket;
	companies: UsageBucket;
	total_requests: number;
}

// ─── Account ────────────────────────────────────────────────────────────

export interface AccountKey {
	key: string;
	created_at: string;
	revoked: boolean;
	request_count: number;
	tier: Tier;
}

/** Response envelope for `GET /v1/auth/me`. */
export interface AccountResponse {
	email: string;
	tier: Tier;
	profiles: UsageBucket;
	images: UsageBucket;
	total_requests: number;
	keys: AccountKey[];
}

/** Response envelope for `DELETE /v1/auth/account` (GDPR Art. 17). */
export interface AccountDeletedResponse {
	deleted: true;
	keys_deleted: number;
}

// ─── Waitlist ───────────────────────────────────────────────────────────

/** Tier a waitlist signup is interested in. */
export type WaitlistInterest = "pro" | "unlimited" | "any";

/** Request body for `POST /v1/waitlist`. */
export interface WaitlistJoinRequest {
	email: string;
	interest?: WaitlistInterest;
	/** Free-form origin label (e.g. "pricing-page", "account"). Max 64 chars. */
	source?: string;
}

/** Response envelope for `POST /v1/waitlist`. */
export interface WaitlistJoinResponse {
	joined: true;
	status: "created" | "updated";
	interest: WaitlistInterest;
	message: string;
}

/** Response envelope for `GET /v1/waitlist/count`. */
export interface WaitlistCountResponse {
	count: number;
}

// ─── API key provisioning ───────────────────────────────────────────────

/** Request body for `POST /v1/keys` and `POST /v1/keys/instant`. */
export interface KeyRequest {
	email: string;
}

/** Response envelope for `POST /v1/keys` (email-delivery flow). */
export interface KeyEmailedResponse {
	message: string;
}

/**
 * Response envelope for `POST /v1/keys/instant`. The key is returned in the
 * body for non-interactive clients (MCP servers, CLIs, CI). A copy is also
 * emailed as a receipt.
 */
export interface InstantKeyResponse {
	key: string;
	status: "created" | "existing";
	email: string;
}

// ─── Errors ─────────────────────────────────────────────────────────────

export interface ApiError {
	error: string;
}

/** Returned with HTTP 429 when a tier limit is reached. */
export interface RateLimitError extends ApiError {
	limit: number;
	used: number;
	tier: Tier;
	type: "profile" | "image" | "company";
	upgrade_url: string;
}
