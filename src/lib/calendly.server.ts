const GATEWAY_URL = "https://connector-gateway.lovable.dev/calendly";

function headers() {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const calendlyKey = process.env["CALENDLY_API_KEY"];
  if (!lovableKey) throw new Error("LOVABLE_API_KEY is not configured");
  if (!calendlyKey) throw new Error("CALENDLY_API_KEY is not configured");
  return {
    Authorization: `Bearer ${lovableKey}`,
    "X-Connection-Api-Key": calendlyKey,
  };
}

async function calendlyGet(path: string, params: Record<string, string> = {}) {
  const url = new URL(`${GATEWAY_URL}${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  const response = await fetch(url.toString(), { headers: headers() });
  if (!response.ok) {
    const body = await response.text();
    console.error(`Calendly request failed [${response.status}]: ${body}`);
    throw new Error(`Calendly request failed [${response.status}]: ${body}`);
  }
  return response.json();
}

export type CalendlyEventType = {
  uri: string;
  name: string;
  duration: number;
  description: string | null;
  schedulingUrl: string;
  color: string;
};

export type CalendlySlot = {
  startTime: string;
  schedulingUrl: string;
};

export async function fetchEventTypes(): Promise<{
  schedulingUrl: string;
  timezone: string;
  eventTypes: CalendlyEventType[];
}> {
  const me = await calendlyGet("/users/me");
  const user = me.resource;

  const data = await calendlyGet("/event_types", {
    user: user.uri,
    active: "true",
    count: "20",
  });

  const eventTypes: CalendlyEventType[] = (data.collection ?? [])
    .filter((e: { secret?: boolean }) => !e.secret)
    .map((e: Record<string, unknown>) => ({
      uri: String(e["uri"]),
      name: String(e["name"]),
      duration: Number(e["duration"] ?? 30),
      description: (e["description_plain"] as string | null) ?? null,
      schedulingUrl: String(e["scheduling_url"]),
      color: String(e["color"] ?? "#0b4f3f"),
    }));

  return {
    schedulingUrl: String(user.scheduling_url),
    timezone: String(user.timezone),
    eventTypes,
  };
}

export async function fetchAvailableTimes(
  eventTypeUri: string,
  startTime: string,
  endTime: string,
): Promise<CalendlySlot[]> {
  const data = await calendlyGet("/event_type_available_times", {
    event_type: eventTypeUri,
    start_time: startTime,
    end_time: endTime,
  });

  return (data.collection ?? [])
    .filter((s: { status?: string }) => s.status !== "unavailable")
    .map((s: Record<string, unknown>) => ({
      startTime: String(s["start_time"]),
      schedulingUrl: String(s["scheduling_url"]),
    }));
}
