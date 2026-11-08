# Neighborhood Listing Platform – Services and Booking Requirements

## User Story 1: Merchant and Provider Service Management

As a merchant or service provider, I want to create and manage service listings so that I can offer services to neighborhood clients.

### Acceptance Criteria
- Given an authenticated merchant or provider, when they submit a valid service listing, then the service is saved as a draft or submitted for approval.
- Given a service listing, when the owner edits it, then only authorized fields and permitted service statuses can be changed.
- Given an invalid service submission, when the data is validated, then the system rejects it and returns validation errors.

**Estimate:** Medium

**Traceability:** `supabase/migrations/20261029140000_exam_services_persistence.sql`; `supabase/migrations/20261029150000_exam_services_rls.sql`; `app/api/services/route.ts`

## User Story 2: Neighborhood Client Browsing and Booking

As a neighborhood client, I want to browse approved services and request appointments so that I can find and book local services.

### Acceptance Criteria
- Given a visitor, when they browse services, then they can view approved public service listings and active categories.
- Given a client, when they submit a valid booking request, then the booking is stored with the requested date and notes.
- Given a client, when they attempt to access private booking records, then access is denied.

**Estimate:** Medium

**Traceability:** `supabase/migrations/20261029140000_exam_services_persistence.sql`; `supabase/migrations/20261029150000_exam_services_rls.sql`; service browsing and booking route handlers.

## User Story 3: Platform Administration

As a platform administrator, I want to oversee service listings and bookings so that I can maintain platform quality and security.

### Acceptance Criteria
- Given an authenticated administrator, when they review platform records, then they can access records permitted by their administrator role.
- Given a non-administrator, when they attempt an administrator-only action, then the system denies the request.
- Given a service or booking record, when authorization is checked, then access follows the platform's role-based security policies.

**Estimate:** Large

**Traceability:** `supabase/migrations/20261029140000_exam_services_persistence.sql`; `supabase/migrations/20261029150000_exam_services_rls.sql`; server-side authorization and route handlers.
