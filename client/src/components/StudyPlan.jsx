function StudyPlan({ plan }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Your Personalized Study Plan
      </h2>

      <p className="mb-4">
        <strong>Total Weekly Study Hours:</strong>{" "}
        {plan.totalAvailableHours}
      </p>

      <h3 className="font-semibold mb-2">Subject-wise Allocation</h3>
      <ul className="space-y-3 mb-4">
        {plan.allocation.map((subject, index) => (
          <li
            key={index}
            className="border p-3 rounded-lg bg-gray-50"
          >
            <strong>{subject.name}</strong> – {subject.allocatedHours} hrs
            <br />
            <span className="text-sm text-gray-600">
              Reason: {subject.reason}
            </span>
          </li>
        ))}
      </ul>

      <h3 className="font-semibold mb-2">Next 7 Days Focus</h3>
      <ul className="list-disc list-inside text-gray-700">
        {plan.nextWeekFocus.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>

      <p className="mt-4 text-sm text-gray-500">
        🔁 Plan dynamically adapts as confidence improves.
      </p>
    </div>
  );
}

export default StudyPlan;
