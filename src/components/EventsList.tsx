import EditorialHoverList from './EditorialHoverList';

interface EventsListProps {
  setView: (view: string) => void;
}

const EVENTS = [
  { id: 'ev-1', date: '12 JUL', title: 'El color en la ciudad', venue: 'Galería Central' },
  { id: 'ev-2', date: '18 JUL', title: 'Collage analógico', venue: 'Café Norte' },
  { id: 'ev-3', date: '05 AGO', title: 'Vernissage: Itinerancia', venue: 'Casa Tomada' },
  { id: 'ev-4', date: '23 AGO', title: 'Luz de barrio', venue: 'Librería del Pasaje' },
];

export default function EventsList({ setView }: EventsListProps) {
  return (
    <section className="snap-section snap-target relative min-h-dvh flex flex-col justify-center py-16 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto w-full">
        <EditorialHoverList
          label="Qué más anda pasando"
          footerNote="Agenda viva · se actualiza cada semana"
          items={EVENTS.map((ev) => ({
            id: ev.id,
            left: ev.date,
            title: ev.title,
            right: ev.venue,
            onClick: () => setView('exhibition'),
          }))}
        />
      </div>
    </section>
  );
}
