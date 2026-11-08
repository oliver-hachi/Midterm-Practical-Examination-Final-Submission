# Security Audit – Row-Level Security

## RLS Test Matrix

| Test | Expected Result | Actual Result |
|---|---|---|
| Anonymous visitor reads approved services | PASS – approved services are visible | Pending verification |
| Anonymous visitor reads draft services | DENIED – draft services are hidden | Pending verification |
| Provider A updates their own draft service | PASS – owner can update eligible service | Pending verification |
| Provider B attempts to update Provider A's service | DENIED – ownership check blocks access | Pending verification |
| Client submits a booking | PASS – booking can be inserted | Pending verification |
| Client attempts to read existing bookings | DENIED – no client SELECT policy exists | Pending verification |
| Provider reads bookings for their own services | PASS – associated bookings are visible | Pending verification |
| Administrator reads and manages records | PASS – elevated server-side service role execution bypasses RLS | Pending verification |

## Security Notes

- Row-Level Security is enabled on all five database tables.
- Tables without an applicable policy use default-deny behavior.
- Providers can only manage services associated with their authenticated user ID.
- Public visitors can only read approved services and active categories.
- Booking records are not publicly readable or available to clients.
- Administrator operations must use the Supabase service role on the server only.
- The service role key must never be exposed in client-side code.

## Verification Status

The policies have been written and reviewed. Database execution and role-based access tests are still pending.
