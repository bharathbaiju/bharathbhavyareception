const EVENT_TITLE = 'Bharath & Bhavya — Reception';
const EVENT_LOCATION = 'Majestic Ceremonials Convention Centre, Koprakalam Juma Masjid Road, Triprayar';
const EVENT_DESCRIPTION = 'Join us for an evening of dinner, laughter and blessings as we celebrate Bharath & Bhavya.';

// 25 Oct 2026, 6:30 PM - 9:30 PM IST (UTC+5:30) expressed in UTC.
const START_UTC = '20261025T130000Z';
const END_UTC = '20261025T160000Z';

export function googleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: EVENT_TITLE,
    dates: `${START_UTC}/${END_UTC}`,
    details: EVENT_DESCRIPTION,
    location: EVENT_LOCATION,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function icsEscape(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
    .replace(/\n/g, '\\n');
}

// Google Calendar's add-via-link template has no way to set custom reminders
// (it always uses the visitor's default Google Calendar notification settings),
// so the 1-day and 1-hour alarms only take effect through this .ics file.
function buildIcsContent(): string {
  const stamp = `${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`;
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Bharath and Bhavya//Reception//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    'UID:bharath-bhavya-reception-25oct2026@bharath-bhavya-reception.vercel.app',
    `DTSTAMP:${stamp}`,
    `DTSTART:${START_UTC}`,
    `DTEND:${END_UTC}`,
    `SUMMARY:${icsEscape(EVENT_TITLE)}`,
    `DESCRIPTION:${icsEscape(EVENT_DESCRIPTION)}`,
    `LOCATION:${icsEscape(EVENT_LOCATION)}`,
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    'DESCRIPTION:Bharath & Bhavya\'s reception is tomorrow',
    'TRIGGER:-P1D',
    'END:VALARM',
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    'DESCRIPTION:Bharath & Bhavya\'s reception starts in 1 hour',
    'TRIGGER:-PT1H',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export function downloadIcsFile(): void {
  const blob = new Blob([buildIcsContent()], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'bharath-bhavya-reception.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
