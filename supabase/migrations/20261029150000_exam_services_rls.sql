-- Neighborhood Listing Platform
-- Row-Level Security policies
-- Default-deny access control

-- Enable RLS on all five tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_category_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Public visitors can read approved services only.
CREATE POLICY "Public can read approved services"
ON services
FOR SELECT
TO anon, authenticated
USING (status = 'approved');

-- Providers and merchants can read their own services.
CREATE POLICY "Owners can read their services"
ON services
FOR SELECT
TO authenticated
USING (provider_id = auth.uid());

-- Providers and merchants can insert their own draft services.
CREATE POLICY "Owners can insert draft services"
ON services
FOR INSERT
TO authenticated
WITH CHECK (
    provider_id = auth.uid()
    AND status = 'draft'
);

-- Owners can update their own draft or suspended services.
CREATE POLICY "Owners can update draft or suspended services"
ON services
FOR UPDATE
TO authenticated
USING (
    provider_id = auth.uid()
    AND status IN ('draft', 'suspended')
)
WITH CHECK (
    provider_id = auth.uid()
    AND status IN ('draft', 'suspended')
);

-- Owners can delete their own draft or suspended services.
CREATE POLICY "Owners can delete draft or suspended services"
ON services
FOR DELETE
TO authenticated
USING (
    provider_id = auth.uid()
    AND status IN ('draft', 'suspended')
);

-- Public visitors can read active service categories.
CREATE POLICY "Public can read active categories"
ON service_categories
FOR SELECT
TO anon, authenticated
USING (active_status = true);

-- Public visitors can read mappings for approved services.
CREATE POLICY "Public can read approved service mappings"
ON service_category_mappings
FOR SELECT
TO anon, authenticated
USING (
    EXISTS (
        SELECT 1
        FROM services
        WHERE services.id = service_category_mappings.service_id
        AND services.status = 'approved'
    )
);

-- Visitors and authenticated users can submit bookings.
CREATE POLICY "Anyone can submit bookings"
ON bookings
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Service providers can read bookings for their own services.
-- No client SELECT policy is created.
CREATE POLICY "Providers can read bookings for their services"
ON bookings
FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM services
        WHERE services.id = bookings.service_id
        AND services.provider_id = auth.uid()
    )
);

-- No public or client read policy exists for bookings.
-- Admin oversight uses the Supabase service role, which bypasses RLS.

-- Authenticated users can read only their own profile.
CREATE POLICY "Users can read their own profile"
ON profiles
FOR SELECT
TO authenticated
USING (id = auth.uid());
