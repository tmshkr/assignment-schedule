import dayjs, { Dayjs } from "dayjs";
import tz from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(tz);
dayjs.extend(utc);

const formatDay = (date: Dayjs) => date.format("YYYY-MM-DD ddd");
const formatTime = (date: Dayjs) => date.format("hh:mma");

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
const startDate = dayjs.tz(assignment.startDate, timezone);
const endDate = dayjs.tz(assignment.endDate, timezone);

let totalMinutes = 0;
for (let d = startDate; d <= endDate; d = d.add(1, "day")) {
  let minutesForDay = 0;
  for (const [startTime, endTime] of assignment.schedule[d.day()]) {
    if (!startTime || !endTime) continue;

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const d1 = d.set("hour", startHour).set("minute", startMinute);
    const d2 = d.set("hour", endHour).set("minute", endMinute);

    const minutes = d2.diff(d1, "minute");
    minutesForDay += minutes;
    totalMinutes += minutes;

    console.log(
      `${formatDay(d)}| start: ${formatTime(d1)} | end: ${formatTime(
        d2
      )} | ${minutes} minutes`
    );
  }

  console.log(`${formatDay(d)}| total: ${minutesForDay / 60} hours`);
  console.log("*******************************************************");
}

console.log(`Total for assignment: ${totalMinutes / 60} hours`);
