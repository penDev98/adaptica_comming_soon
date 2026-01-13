import type { Context, Config } from "@netlify/functions";

interface FormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

interface AirtableRecord {
  fields: {
    Name: string;
    Email: string;
    Phone: string;
    Message: string;
  };
}

export default async (req: Request, context: Context): Promise<Response> => {
  // Only allow POST requests
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const formData: FormData = await req.json();

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, and message are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Get Airtable credentials from environment variables
    const airtableApiKey = Netlify.env.get("AIRTABLE_API_KEY");
    const airtableBaseId = Netlify.env.get("AIRTABLE_BASE_ID");
    const airtableTableName = Netlify.env.get("AIRTABLE_TABLE_NAME");

    if (!airtableApiKey || !airtableBaseId || !airtableTableName) {
      console.error("Missing Airtable configuration");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Prepare the Airtable record
    const airtableRecord: AirtableRecord = {
      fields: {
        Name: formData.name,
        Email: formData.email,
        Phone: formData.phone || "",
        Message: formData.message,
      },
    };

    // Send data to Airtable
    const airtableUrl = `https://api.airtable.com/v0/${airtableBaseId}/${encodeURIComponent(airtableTableName)}`;

    const airtableResponse = await fetch(airtableUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(airtableRecord),
    });

    if (!airtableResponse.ok) {
      const errorData = await airtableResponse.text();
      console.error("Airtable API error:", errorData);
      return new Response(
        JSON.stringify({ error: "Failed to save data" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const result = await airtableResponse.json();

    return new Response(
      JSON.stringify({ success: true, id: result.id }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing form submission:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const config: Config = {
  path: "/api/submit-form",
};
