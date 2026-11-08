

import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/src/lib/supabaseServer";
import { serviceSchema } from "@/src/schemas/service";

// GET: Return approved services with public information only.
export async function GET() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("services")
    .select(
      "id, title, hourly_rate, duration_minutes, coverage_radius_miles"
    )
    .eq("status", "approved");

  if (error) {
    console.error("Supabase GET error:", error);
    return NextResponse.json(
      { error: "Unable to retrieve services" },
      { status: 500 }
    );
  }

  return NextResponse.json({ services: data }, { status: 200 });
}

// POST: Validate and save an authenticated provider's service.
export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();

  // Verify the authenticated user.
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  // Only providers and merchants can submit services.
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (
    profileError ||
    !profile ||
    !["provider", "merchant"].includes(profile.role)
  ) {
    return NextResponse.json(
      { error: "Only providers and merchants can submit services" },
      { status: 403 }
    );
  }

  // Read and validate the request body.
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON request body" },
      { status: 400 }
    );
  }

  const validation = serviceSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: validation.error.flatten(),
      },
      { status: 400 }
    );
  }

  // The provider ID comes from the authenticated session, not the request.
  const { data, error } = await supabase
    .from("services")
    .insert({
      ...validation.data,
      provider_id: user.id,
      status: "draft",
    })
    .select(
      "id, title, hourly_rate, duration_minutes, coverage_radius_miles, status"
    )
    .single();

  if (error) {
    console.error("Supabase POST error:", error);
    return NextResponse.json(
      { error: "Unable to create service" },
      { status: 500 }
    );
  }

  return NextResponse.json({ service: data }, { status: 201 });
}
