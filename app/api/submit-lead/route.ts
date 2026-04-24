import { NextResponse } from "next/server";

/**
 * POST /api/submit-lead
 * Receives lead form data and creates a contact in GHL BMH sub-account.
 * GHL credentials stored server-side in env vars — never exposed to client.
 * Entity: Buy My House Boise
 */
export async function POST(request: Request) {
  try {
    // Parse incoming form data
    const body = await request.json();
    const { firstName, lastName, phone, address1, city } = body;

    // Basic server-side validation
    if (!firstName || !lastName || !phone || !address1 || !city) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // GHL credentials — loaded from env vars (not exposed to client)
    const apiKey = process.env.GHL_BMH_API_KEY;
    const locationId = process.env.GHL_BMH_LOCATION_ID;

    if (!apiKey || !locationId) {
      console.error("Missing GHL env vars: GHL_BMH_API_KEY or GHL_BMH_LOCATION_ID");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // POST contact to GHL BMH sub-account
    // API docs: https://highlevel.stoplight.io/docs/integrations/Contact
    const ghlResponse = await fetch(
      "https://services.leadconnectorhq.com/contacts/",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Version": "2021-07-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          address1,
          city,
          locationId,          // Required: ties contact to BMH sub-account
          tags: ["bmh-website", "web-lead"], // Tag for lead tracking
          source: "buymyhouse.co",
        }),
      }
    );

    if (!ghlResponse.ok) {
      // Log the GHL error for debugging without exposing internals
      const ghlError = await ghlResponse.text();
      console.error(`GHL API error ${ghlResponse.status}:`, ghlError);
      return NextResponse.json(
        { error: "Failed to submit lead" },
        { status: 500 }
      );
    }

    const ghlData = await ghlResponse.json();
    console.log("GHL contact created:", ghlData?.contact?.id);

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (err) {
    console.error("submit-lead route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
