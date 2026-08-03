import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type { CalendlyEventType, CalendlySlot } from "./calendly.server";

export const getConsultationEventTypes = createServerFn({ method: "GET" }).handler(
  async () => {
    const { fetchEventTypes } = await import("./calendly.server");
    return fetchEventTypes();
  },
);

export const getConsultationSlots = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        eventTypeUri: z.string().url().max(300),
        startTime: z.string().max(40),
        endTime: z.string().max(40),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const { fetchAvailableTimes } = await import("./calendly.server");
    return fetchAvailableTimes(data.eventTypeUri, data.startTime, data.endTime);
  });
