import { DateTime } from "luxon";

export function getTimeForZone(zone) {
  const now = DateTime.now().setZone(zone);

  if (!now.isValid) {
    console.error("Invalid time zone:", zone);
    return null;
  }

  return {
    hours: now.hour,
    minutes: now.minute,
    seconds: now.second
  };
}
