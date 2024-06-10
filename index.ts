import { addDays, differenceInMinutes, set } from "date-fns";
import { toZonedTime, format } from "date-fns-tz";

const formatDay = (zonedDate: Date, timeZone: string) =>
  format(zonedDate, "yyyy-MM-dd EEE", { timeZone });

const formatTime = (zonedDate: Date, timeZone: string) =>
  format(zonedDate, "hh:mmaaa", { timeZone });

const assignment = {
  id: 12345,
  personId: 12345,
  startDate: "2024-06-01",
  endDate: "2024-06-15",
  projectId: 12345,
  roleId: 12345,
  isActive: true,
  note: "",
  isBillable: true,
  phaseId: null,
  // Mon-Fri 9:00am to 6:00pm with a 1-hour break
  timezone: "America/Los_Angeles",
  schedule: [
    [],
    [
      ["9:00", "12:00"],
      ["13:00", "18:00"],
    ],
    [
      ["9:00", "12:00"],
      ["13:00", "18:00"],
    ],
    [
      ["9:00", "12:00"],
      ["13:00", "18:00"],
    ],
    [
      ["9:00", "12:00"],
      ["13:00", "18:00"],
    ],
    [
      ["9:00", "12:00"],
      ["13:00", "18:00"],
    ],
    [],
  ],
  isTemplate: false,
  isPlaceholder: false,
  workstreamId: null,
  createdAt: "2024-06-05T07:23:45.080Z",
  updatedAt: "2024-06-05T07:23:45.080Z",
};

const timezone = assignment.timezone;
const startDate = toZonedTime(assignment.startDate, timezone);
const endDate = toZonedTime(assignment.endDate, timezone);

let totalMinutes = 0;
for (let d = startDate; d <= endDate; d = addDays(d, 1)) {
  let minutesForDay = 0;
  for (const [startTime, endTime] of assignment.schedule[d.getDay()]) {
    if (!startTime || !endTime) continue;

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const d1 = set(d, { hours: startHour, minutes: startMinute });
    const d2 = set(d, { hours: endHour, minutes: endMinute });

    const minutes = differenceInMinutes(d2, d1);
    minutesForDay += minutes;
    totalMinutes += minutes;

    console.log(
      `${formatDay(d, timezone)}| start: ${formatTime(
        d1,
        timezone
      )} | end: ${formatTime(d2, timezone)} | ${minutes} minutes`
    );
  }

  console.log(`${formatDay(d, timezone)}| total: ${minutesForDay / 60} hours`);
  console.log("*******************************************************");
}

console.log(`Total for assignment: ${totalMinutes / 60} hours`);
