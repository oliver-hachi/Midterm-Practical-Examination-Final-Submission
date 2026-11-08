type ServiceCardProps = {
  title: string;
  hourlyRate: number;
  durationMinutes: number;
  coverageRadiusMiles: number;
};

export default function ServiceCard({
  title,
  hourlyRate,
  durationMinutes,
  coverageRadiusMiles,
}: ServiceCardProps) {
  return (
    <article className="rounded-lg border bg-white p-6 shadow-sm">
      <header className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {title}
        </h2>
      </header>

      <ul className="mb-6 space-y-2 text-gray-700">
        <li>Rate: ${hourlyRate.toFixed(2)}/hr</li>
        <li>Duration: {durationMinutes} minutes</li>
        <li>Coverage radius: {coverageRadiusMiles} miles</li>
      </ul>

      <button
        type="button"
        aria-label={`Book ${title}`}
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
      >
        Book Now
      </button>
    </article>
  );
}
