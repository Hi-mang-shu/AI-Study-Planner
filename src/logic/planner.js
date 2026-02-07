export function generateStudyPlan(data) {
  const totalAvailableHours =
    data.studyHoursWeekday * 5 + data.studyHoursWeekend * 2;

  let totalPriority = 0;

  const subjectsWithPriority = data.subjects.map((subject) => {
    const priority =
      subject.credits * 2 +
      (5 - subject.confidence) * 3 +
      (subject.weakTopics?.length || 0) * 2 -
      (subject.strongTopics?.length || 0);

    totalPriority += priority;

    return { ...subject, priority };
  });

  const allocation = subjectsWithPriority.map((subject) => {
    const allocatedHours =
      (subject.priority / totalPriority) * totalAvailableHours;

    const learningHours = allocatedHours * 0.5;
    const practiceHours = allocatedHours * 0.3;
    const revisionHours = allocatedHours * 0.2;

    let cognitiveLoad = "Medium";
    if (subject.confidence <= 2) cognitiveLoad = "High";
    if (subject.confidence >= 4) cognitiveLoad = "Low";

    let explanation = `Allocated more time based on `;
    if (subject.confidence <= 2)
      explanation += `low confidence, `;
    if (subject.weakTopics.length > 0)
      explanation += `presence of weak topics, `;
    explanation += `and subject credit weight.`;

    return {
      ...subject,
      allocatedHours: allocatedHours.toFixed(1),
      breakdown: {
        learning: learningHours.toFixed(1),
        practice: practiceHours.toFixed(1),
        revision: revisionHours.toFixed(1),
      },
      cognitiveLoad,
      explanation,
    };
  });

  // Week-by-week focus
  const weekPlan = allocation.map((subject) => ({
    subject: subject.name,
    week1: subject.weakTopics.slice(0, 2),
    week2: subject.weakTopics.slice(2),
    ongoing: subject.strongTopics,
  }));

  return {
    totalAvailableHours: totalAvailableHours.toFixed(1),
    allocation,
    weekPlan,
    nextSteps: [
      "Start with weak topics before moving to advanced concepts",
      "Schedule high-focus subjects during peak energy hours",
      "Revise strong topics briefly to maintain retention",
      "Reassess confidence levels weekly and rebalance plan",
    ],
    outcomeSummary: {
      expectedImprovement: "Higher confidence in weak subjects",
      stressReduction: "Reduced last-minute cramming",
      completionConfidence: "Steady progress toward target date",
    },
  };
}
