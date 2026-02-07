export function generateStudyPlan(data) {
  const totalAvailableHours =
    data.studyHoursWeekday * 5 + data.studyHoursWeekend * 2;

  let totalPriority = 0;

  const subjectsWithPriority = data.subjects.map((subject) => {
    const priority =
      subject.credits * 2 +
      (5 - subject.confidence) * 3 +
      (subject.weakTopics?.length || 0) * 2;

    totalPriority += priority;

    return { ...subject, priority };
  });

  const allocation = subjectsWithPriority.map((subject) => {
    const hours = (
      (subject.priority / totalPriority) *
      totalAvailableHours
    ).toFixed(1);

    return {
      ...subject,
      allocatedHours: hours,
      reason:
        subject.confidence <= 2
          ? "Low confidence and high conceptual load"
          : "Balanced allocation based on credits and understanding",
    };
  });

  return {
    totalAvailableHours,
    allocation,
    nextWeekFocus: allocation
      .filter((s) => s.confidence <= 3)
      .map((s) => s.weakTopics)
      .flat(),
  };
}
