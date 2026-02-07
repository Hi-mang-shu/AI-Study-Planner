function StudyPlan({ plan, onBack }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Build weekly schedule
  const weeklySchedule = days.map((day) => {
    return plan.allocation.map((subject) => {
      const dailyHours = (subject.allocatedHours / 7).toFixed(1);

      return {
        subject: subject.name,
        cognitiveLoad: subject.cognitiveLoad,
        learning: (dailyHours * 0.5).toFixed(1),
        practice: (dailyHours * 0.3).toFixed(1),
        revision: (dailyHours * 0.2).toFixed(1),
      };
    });
  });

  const loadColor = {
    High: "bg-red-100 border-red-300",
    Medium: "bg-yellow-100 border-yellow-300",
    Low: "bg-green-100 border-green-300",
  };

  return (
    <div className="space-y-10">
      <h2 className="text-2xl font-semibold text-gray-800">
        Your Personalized Study Plan
      </h2>

      <p className="text-gray-700">
        <strong>Total Weekly Study Hours:</strong>{" "}
        {plan.totalAvailableHours}
      </p>

      {/* ================= VISUAL WEEKLY CALENDAR ================= */}
      <div>
        <h3 className="text-xl font-semibold mb-4">
          Weekly Study Calendar
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {days.map((day, dayIndex) => (
            <div
              key={day}
              className="border rounded-xl p-3 bg-gray-50"
            >
              <h4 className="font-semibold text-center mb-2">
                {day}
              </h4>

              <div className="space-y-2">
                {weeklySchedule[dayIndex].map((slot, idx) => (
                  <div
                    key={idx}
                    className={`border rounded-lg p-2 text-xs ${loadColor[slot.cognitiveLoad]}`}
                  >
                    <p className="font-semibold">{slot.subject}</p>
                    <p>Learn: {slot.learning}h</p>
                    <p>Practice: {slot.practice}h</p>
                    <p>Revise: {slot.revision}h</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-3">
          🔴 High cognitive load subjects should be studied during peak energy hours.
          🟡 Medium load during regular hours.
          🟢 Low load during relaxed sessions.
        </p>
      </div>

      {/* ================= SUBJECT GUIDANCE ================= */}
      <div className="space-y-6">
        {plan.allocation.map((subject, index) => (
          <div
            key={index}
            className="border rounded-xl p-5 bg-gray-50"
          >
            <h3 className="text-lg font-semibold text-indigo-600">
              {subject.name}
            </h3>

            <p className="text-sm text-gray-600 mb-2">
              Cognitive Load:{" "}
              <span className="font-medium">
                {subject.cognitiveLoad}
              </span>
            </p>

            <p className="text-sm text-gray-700 mb-3">
              {subject.explanation}
            </p>

            <p className="font-medium">
              Total Time: {subject.allocatedHours} hrs/week
            </p>

            <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
              <li>Learning: {subject.breakdown.learning} hrs</li>
              <li>Practice: {subject.breakdown.practice} hrs</li>
              <li>Revision: {subject.breakdown.revision} hrs</li>
            </ul>

            {subject.weakTopics.length > 0 && (
              <p className="text-sm text-red-600 mt-2">
                Focus weak areas first:{" "}
                {subject.weakTopics.join(", ")}
              </p>
            )}

            {subject.strongTopics.length > 0 && (
              <p className="text-sm text-green-600 mt-1">
                Strong areas (light revision):{" "}
                {subject.strongTopics.join(", ")}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* ================= ACTIONABLE GUIDANCE ================= */}
      <div className="bg-indigo-50 p-4 rounded-lg">
        <h3 className="font-semibold text-indigo-700 mb-2">
          Weekly Guidance Summary
        </h3>
        <ul className="text-sm text-indigo-800 list-disc list-inside">
          <li>Start each week by reviewing weak topics</li>
          <li>Schedule high-load subjects during your most focused hours</li>
          <li>Use revision slots to reinforce strong areas</li>
          <li>Re-evaluate confidence every week and regenerate the plan</li>
        </ul>
      </div>

      <button
        onClick={onBack}
        className="text-indigo-600 font-medium"
      >
        ← Edit Inputs
      </button>
    </div>
  );
}

export default StudyPlan;
