const { addDays, differenceInMinutes, set } = require("date-fns");
const { formatWithOptions } = require("date-fns/fp");
const { UTCDate } = require("@date-fns/utc");

const formatDay = formatWithOptions({}, "yyyy-MM-dd EEE");
const formatTime = formatWithOptions({}, "hh:mmaaa");

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

const startDate = new UTCDate(assignment.startDate);
const endDate = new UTCDate(assignment.endDate);

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
			`${formatDay(d)}| start: ${formatTime(d1)} | end: ${formatTime(d2)} | ${minutes} minutes`,
		);
	}

	console.log(`${formatDay(d)}| total: ${minutesForDay / 60} hours`);
	console.log("*******************************************************");
}

console.log(`Total for assignment: ${totalMinutes / 60} hours`);
