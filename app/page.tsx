import ServiceCard from "@/src/components/ServiceCard";

const services = [
  {
    id: 1,
    title: "Home Plumbing",
    hourlyRate: 75,
    durationMinutes: 60,
    coverageRadiusMiles: 10,
  },
  {
    id: 2,
    title: "Home Inspection",
    hourlyRate: 100,
    durationMinutes: 90,
    coverageRadiusMiles: 15,
  },
  {
    id: 3,
    title: "Home Staging",
    hourlyRate: 85,
    durationMinutes: 120,
    coverageRadiusMiles: 12,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Neighborhood Services
        </h1>

        <section
          aria-label="Available services"
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              hourlyRate={service.hourlyRate}
              durationMinutes={service.durationMinutes}
              coverageRadiusMiles={service.coverageRadiusMiles}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
