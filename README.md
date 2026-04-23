# random-profiles-types

TypeScript types for the [Random Profiles API](https://random-profiles.com).

Zero runtime — pure `.d.ts` declarations mirroring the public JSON shapes returned by `/v1/*`. Use with the built-in `fetch`, `axios`, or any other HTTP client.

## Install

```bash
npm install -D random-profiles-types
```

## Usage

```ts
import type {
  Profile,
  Company,
  ProfilesResponse,
  CompaniesResponse,
  UsageResponse,
} from "random-profiles-types";

const res = await fetch("https://random-profiles.com/v1/profiles?count=5", {
  headers: { "X-API-Key": process.env.RANDOM_PROFILES_API_KEY! },
});
const { profiles }: ProfilesResponse = await res.json();

profiles.forEach((p: Profile) => {
  console.log(p.name.first, p.email, p.relationships.company_uuid);
});
```

Filtering companies, with a typed query object:

```ts
import type { CompaniesQuery, CompaniesResponse } from "random-profiles-types";

const query: CompaniesQuery = {
  count: 20,
  industry: "Technology",
  country: "US,GB",
  size: "201-500,501-1000",
  fields: "name,industry,leadership,tech,relationships",
  logo_size: "256",
};

const params = new URLSearchParams(
  Object.entries(query).map(([k, v]) => [k, String(v)])
);
const res = await fetch(
  `https://random-profiles.com/v1/companies?${params}`,
  { headers: { "X-API-Key": process.env.RANDOM_PROFILES_API_KEY! } }
);
const { companies }: CompaniesResponse = await res.json();
```

Walking the relationship graph:

```ts
import type { Company, Profile } from "random-profiles-types";

const company: Company = /* …fetched from /v1/companies/{uuid} */;

for (const uuid of company.relationships.employee_uuids) {
  const res = await fetch(
    `https://random-profiles.com/v1/profiles/${uuid}`,
    { headers: { "X-API-Key": key } }
  );
  const employee: Profile = await res.json();
  console.log(`${employee.name.first} @ ${company.name}`);
}
```

## What's exported

- **Profile types** — `Profile` plus every field-group sub-type (`ProfileName`, `ProfileJob`, `ProfileRelationships`, …) and `ProfilesResponse`, `ProfilesQuery`.
- **Company types** — `Company` plus every field-group sub-type (`CompanyFinancial`, `CompanyTech`, `CompanyRelationships`, …), `FundingRound`, `CompanyLocationRef`, `CompaniesResponse`, `CompaniesQuery`.
- **Billing / account** — `UsageBucket`, `UsageResponse`, `AccountResponse`, `AccountKey`, `AccountDeletedResponse`.
- **Enumerations** — `CountryCode`, `Industry`, `CompanySize`, `CompanyType`, `CompanyStatus`, `RemotePolicy`, `TargetMarket`, `Tier`, `Gender`, `ImageSize`, `ProfileFieldGroup`, `CompanyFieldGroup`.
- **Errors** — `ApiError`, `RateLimitError`.

## License

MIT
