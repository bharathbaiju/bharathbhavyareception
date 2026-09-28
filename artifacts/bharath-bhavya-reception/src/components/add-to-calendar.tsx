import { CalendarPlus, Download } from 'lucide-react';
import { downloadIcsFile, googleCalendarUrl } from '@/lib/calendar';

export function AddToCalendar() {
  return (
    <div className="calendar-actions">
      <span className="calendar-actions-label">Add to calendar</span>
      <div className="calendar-actions-row">
        <a
          className="calendar-btn"
          href={googleCalendarUrl()}
          target="_blank"
          rel="noreferrer"
          data-testid="link-add-google-calendar"
        >
          <CalendarPlus size={14} aria-hidden="true" /> Google
        </a>
        <button
          type="button"
          className="calendar-btn"
          onClick={downloadIcsFile}
          data-testid="button-add-apple-calendar"
        >
          <Download size={14} aria-hidden="true" /> Apple / Outlook
        </button>
      </div>
      <p className="calendar-actions-note">Apple / Outlook include reminders 1 day &amp; 1 hour before</p>
    </div>
  );
}
