import type { ShipmentEvent } from '../../types/order'
import { formatDateTime } from '../../utils/format'

export default function ShippingTimeline({ events }: { events: ShipmentEvent[] }) {
  if (events.length === 0) {
    return <p className="muted">Informasi pengiriman belum tersedia.</p>
  }

  return (
    <ol className="timeline">
      {events.map((event) => (
        <li className={event.active ? 'timeline-item active' : 'timeline-item'} key={`${event.time}-${event.title}`}>
          <span className="timeline-dot" aria-hidden="true" />
          <div>
            <strong>{event.title}</strong>
            {event.description && <p>{event.description}</p>}
            <time dateTime={event.time}>{formatDateTime(event.time)}</time>
          </div>
        </li>
      ))}
    </ol>
  )
}
