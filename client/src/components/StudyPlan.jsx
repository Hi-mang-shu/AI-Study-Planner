function StudyPlan({ plan, onBack }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">
        Your Personalized Study Plan
      </h2>

      <p>
        <strong>Total Weekly Study Hours:</strong>{" "}
        {plan.totalAvailableHours}
      </p>

      <div className="space-y-4">
        {plan.allocation.map((subject, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 bg-gray-50"
          >
            <h3 className="font-semibold">
              {subject.name} — {subject.allocatedHours} hrs
            </h3>

            <p className="text-sm text-gray-600">
              {subject.reason}
            </p>

            {subject.weakTopics.length > 0 && (
              <p className="text-sm text-red-600 mt-1">
                Weak topics: {subject.weakTopics.join(", ")}
              </p>
            )}

            {subject.strongTopics.length > 0 && (
              <p className="text-sm text-green-600 mt-1">
                Strong topics: {subject.strongTopics.join(", ")}
              </p>
            )}
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-semibold mb-1">Next 7 Days Focus</h3>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {plan.nextWeekFocus.map((topic, i) => (
            <li key={i}>{topic}</li>
          ))}
        </ul>
      </div>

      <button
        onClick={onBack}
        className="mt-4 text-indigo-600 font-medium"
      >
        ← Edit Inputs
      </button>
    </div>
  );
}

export default StudyPlan;
