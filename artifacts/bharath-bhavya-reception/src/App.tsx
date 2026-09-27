import { type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDown, ArrowRight, CalendarDays, Check, Clock3, MapPin } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const receptionDate = new Date('2026-10-25T18:30:00+05:30');

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getCountdown(): Countdown {
  const distance = Math.max(0, receptionDate.getTime() - Date.now());
  const seconds = Math.floor(distance / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

function Home() {
  const [countdown, setCountdown] = useState<Countdown>(getCountdown);
  const [coverVisible, setCoverVisible] = useState(true);
  const [coverPhase, setCoverPhase] = useState<'closed' | 'opening'>('closed');
  const [guestName, setGuestName] = useState('');
  const [attendance, setAttendance] = useState('');
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const coverButtonRef = useRef<HTMLButtonElement>(null);
  const openingTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (coverVisible) coverButtonRef.current?.focus();
  }, [coverVisible]);

  useEffect(() => {
    const htmlOverflow = document.documentElement.style.overflow;
    const bodyOverflow = document.body.style.overflow;

    if (coverVisible) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.documentElement.style.overflow = htmlOverflow;
      document.body.style.overflow = bodyOverflow;
    };
  }, [coverVisible]);

  useEffect(() => () => {
    if (openingTimerRef.current) window.clearTimeout(openingTimerRef.current);
  }, []);

  const openInvitation = () => {
    if (coverPhase !== 'closed') return;

    setCoverPhase('opening');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCoverVisible(false);
      return;
    }

    openingTimerRef.current = window.setTimeout(() => {
      setCoverVisible(false);
    }, 1320);
  };

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getCountdown()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const scrollToRsvp = () => {
    document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!guestName.trim() || !attendance) {
      setFormError('Please add your name and let us know if you will join us.');
      return;
    }
    setFormError('');
    setSubmitted(true);
  };

  return (
    <main className="invitation-page" data-testid="page-reception-invitation">
      {coverVisible && (
        <div
          className={`invitation-cover ${coverPhase === 'opening' ? 'is-opening' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="invitation-cover-title"
          data-testid="invitation-cover"
        >
          <div className="cover-panels" aria-hidden="true">
            <div className="cover-panel cover-panel-left" />
            <div className="cover-panel cover-panel-right" />
          </div>
          <div className="cover-atmosphere" aria-hidden="true">
            <span className="cover-star cover-star-one" />
            <span className="cover-star cover-star-two" />
            <span className="cover-star cover-star-three" />
            <span className="cover-arc cover-arc-one" />
            <span className="cover-arc cover-arc-two" />
          </div>
          <div className="cover-edge" aria-hidden="true" />
          <div className="cover-content">
            <p className="cover-kicker">An evening to remember</p>
            <div className="cover-mark" aria-label="B and B monogram" data-testid="text-cover-monogram">
              <span>B</span><i>&amp;</i><span>B</span>
            </div>
            <p className="cover-overline">Together with their families</p>
            <h1 id="invitation-cover-title" className="cover-title" data-testid="text-cover-couple-name">
              <span>Bharath</span>
              <em>&amp;</em>
              <span>Bhavya</span>
            </h1>
            <div className="cover-rule" aria-hidden="true"><span /></div>
            <p className="cover-date" data-testid="text-cover-date">Sunday <b>·</b> 25 October 2026</p>
            <p className="cover-place">Reception · Triprayar</p>
            <button
              ref={coverButtonRef}
              className="cover-open-button"
              onClick={openInvitation}
              type="button"
              data-testid="button-open-invitation"
            >
              <span>Open invitation</span>
              <ArrowDown aria-hidden="true" />
            </button>
            <p className="cover-hint">Tap to unfold the evening</p>
          </div>
        </div>
      )}
      <section className="hero" data-testid="section-hero">
        <div className="hero-orbit" aria-hidden="true" />
        <div className="hero-inner">
          <p className="eyebrow" data-testid="text-hero-eyebrow">Together with their families</p>
          <div className="monogram" aria-label="B and B monogram" data-testid="text-monogram">B&amp;B</div>
          <h1 data-testid="text-couple-name">
            Bharath
            <span>&amp;</span>
            Bhavya
          </h1>
          <p className="hero-date" data-testid="text-hero-date"><b>Sunday</b> · 25 October 2026</p>
          <button className="hero-cta" onClick={scrollToRsvp} data-testid="button-open-rsvp">
            Join us for the evening <ArrowDown aria-hidden="true" />
          </button>
          <p className="scroll-cue">A reception invitation<span aria-hidden="true" /></p>
        </div>
      </section>

      <section className="section welcome-section" data-testid="section-welcome">
        <div className="section-inner welcome-grid">
          <div>
            <p className="section-kicker">A little note</p>
            <h2 className="section-title">Come as you are.<br />Leave with a memory.</h2>
          </div>
          <div className="welcome-note">
            <strong>We would love to share this beautiful evening with you.</strong>
            Dinner, laughter and blessings mean more when the people we love are close. Thank you for being part of our story.
          </div>
        </div>
      </section>

      <section className="section event-section" data-testid="section-event-details">
        <div className="section-inner event-grid">
          <div>
            <p className="section-kicker">The reception</p>
            <h2 className="section-title">One evening,<br />held close.</h2>
            <div className="date-lockup">
              <strong>25 / 10 / 26</strong>
              <span>Sunday · 6:30 PM – 9:30 PM</span>
            </div>
          </div>
          <div className="event-details">
            <div className="detail-row">
              <div className="detail-label"><CalendarDays size={14} aria-hidden="true" /> Date</div>
              <div className="detail-value" data-testid="text-event-date">Sunday, 25 October 2026</div>
            </div>
            <div className="detail-row">
              <div className="detail-label"><Clock3 size={14} aria-hidden="true" /> Time</div>
              <div className="detail-value" data-testid="text-event-time">6:30 PM – 9:30 PM</div>
            </div>
            <div className="detail-row">
              <div className="detail-label"><MapPin size={14} aria-hidden="true" /> Place</div>
              <div className="detail-value" data-testid="text-event-venue">
                Majestic Ceremonials Convention Centre
                <span className="detail-sub">Koprakalam Juma Masjid Road, Triprayar</span>
                <a
                  className="map-link"
                  href="https://www.google.com/maps/search/?api=1&query=Majestic+Ceremonials+Convention+Centre+Triprayar"
                  target="_blank"
                  rel="noreferrer"
                  data-testid="link-venue-map"
                >
                  Open venue map <ArrowRight size={13} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section countdown-section" data-testid="section-countdown">
        <div className="section-inner">
          <p className="section-kicker">Until we gather</p>
          <h2 className="section-title">Counting the moments<br />until we see you.</h2>
          <div className="countdown-grid" aria-live="polite" data-testid="countdown-timer">
            <div className="count-unit"><span className="count-number" data-testid="countdown-days">{String(countdown.days).padStart(2, '0')}</span><span className="count-label">Days</span></div>
            <div className="count-unit"><span className="count-number" data-testid="countdown-hours">{String(countdown.hours).padStart(2, '0')}</span><span className="count-label">Hours</span></div>
            <div className="count-unit"><span className="count-number" data-testid="countdown-minutes">{String(countdown.minutes).padStart(2, '0')}</span><span className="count-label">Minutes</span></div>
            <div className="count-unit"><span className="count-number" data-testid="countdown-seconds">{String(countdown.seconds).padStart(2, '0')}</span><span className="count-label">Seconds</span></div>
          </div>
        </div>
      </section>

      <section className="section moments-section" data-testid="section-moments">
        <div className="section-inner">
          <div className="moments-head">
            <div>
              <p className="section-kicker">Little visual notes</p>
              <h2 className="section-title">The feeling<br />of the evening.</h2>
            </div>
            <p>Soft light, familiar voices, and a room full of people who matter.</p>
          </div>
          <div className="moment-grid" aria-label="Decorative memory moments">
            <div className="moment moment-one moment-large"><span className="moment-caption">Warm light</span></div>
            <div className="moment moment-two"><span className="moment-caption">Good company</span></div>
            <div className="moment moment-three"><span className="moment-caption">A shared table</span></div>
            <div className="moment moment-four"><span className="moment-caption">Beautiful beginnings</span></div>
          </div>
        </div>
      </section>

      <section className="section timeline-section" data-testid="section-timeline">
        <div className="section-inner timeline-layout">
          <div>
            <p className="section-kicker">The shape of the evening</p>
            <h2 className="section-title">No itinerary.<br />Just togetherness.</h2>
          </div>
          <div className="timeline">
            <div className="timeline-row">
              <div className="timeline-time">6:30 PM</div>
              <div className="timeline-copy"><h3>Welcome</h3><p>Arrive, settle in, and find the people you came to see.</p></div>
            </div>
            <div className="timeline-row">
              <div className="timeline-time">Then</div>
              <div className="timeline-copy"><h3>Dinner &amp; laughter</h3><p>An evening around a shared table, with plenty of time for stories.</p></div>
            </div>
            <div className="timeline-row">
              <div className="timeline-time">Before we part</div>
              <div className="timeline-copy"><h3>Blessings</h3><p>A little love, a few good wishes, and memories to take home.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section rsvp-section" id="rsvp" data-testid="section-rsvp">
        <div className="section-inner rsvp-layout">
          <div className="rsvp-copy">
            <p className="section-kicker">A place for you</p>
            <h2 className="section-title">Will we<br />see you there?</h2>
            <p>Let us know so we can save a place for you at the evening.</p>
          </div>
          {submitted ? (
            <div className="rsvp-success" data-testid="status-rsvp-success">
              <div>
                <div className="success-mark"><Check size={25} aria-hidden="true" /></div>
                <h3>Thank you, {guestName.trim()}.</h3>
                <p>{attendance === 'yes' ? 'We are so glad you will be with us for the reception.' : 'Thank you for sending your warm wishes our way.'}</p>
                <button className="reset-rsvp" onClick={() => setSubmitted(false)} data-testid="button-edit-rsvp">Edit response</button>
              </div>
            </div>
          ) : (
            <form className="rsvp-form" onSubmit={handleSubmit} noValidate data-testid="form-rsvp">
              <div className="form-block">
                <label className="form-label" htmlFor="guest-name">Your name</label>
                <input
                  className="field"
                  id="guest-name"
                  type="text"
                  value={guestName}
                  onChange={(event) => setGuestName(event.target.value)}
                  placeholder="How shall we welcome you?"
                  autoComplete="name"
                  data-testid="input-guest-name"
                />
              </div>
              <div className="form-block">
                <span className="form-label">Will you be joining us?</span>
                <div className="choice-row">
                  <div className="choice">
                    <input id="attending-yes" type="radio" name="attendance" value="yes" checked={attendance === 'yes'} onChange={(event) => setAttendance(event.target.value)} data-testid="input-attendance-yes" />
                    <label htmlFor="attending-yes">Yes, with joy</label>
                  </div>
                  <div className="choice">
                    <input id="attending-no" type="radio" name="attendance" value="no" checked={attendance === 'no'} onChange={(event) => setAttendance(event.target.value)} data-testid="input-attendance-no" />
                    <label htmlFor="attending-no">Sending my wishes</label>
                  </div>
                </div>
                {formError && <div className="form-error" role="alert" data-testid="status-rsvp-error">{formError}</div>}
              </div>
              <button className="submit-button" type="submit" data-testid="button-submit-rsvp">
                Send my response <ArrowRight size={15} aria-hidden="true" />
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="footer" data-testid="section-footer">
        <div className="footer-monogram" aria-hidden="true">B&amp;B</div>
        <h2>See you in the glow.</h2>
        <p>Dinner, laughter and blessings for the newlyweds.</p>
        <div className="footer-rule" aria-hidden="true" />
        <div className="footer-small">Bharath &amp; Bhavya · 25 October 2026</div>
      </footer>

      <button className="floating-rsvp" onClick={scrollToRsvp} data-testid="button-floating-rsvp">
        RSVP <ArrowRight size={13} aria-hidden="true" />
      </button>
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;