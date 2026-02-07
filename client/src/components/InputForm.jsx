import { useState } from "react";
import { generateStudyPlan } from "../logic/planner";

function InputForm({ onGeneratePlan }) {
  const [studyHoursWeekday, setStudyHoursWeekday] = useState(3);
  const [studyHoursWeekend, setStudyHoursWeekend] = useState(6);

  const [subjects, setSubjects] = useState([
    {
      name: "Data Structures",
      credits: 4,
      confidence: 3,
      weakTopics: "Trees, Graphs",
    },
  ]);

  const handleSubjectChange = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  const addSubject = () => {
    setSubjects([
      ...subjects,
      { name: "", credits: 3, confidence: 3, weakTopics: "" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedSubjects = subjects.map((s) => ({
      ...s,
      credits: Number(s.credits),
      confidence: Number(s.confidence),
      weakTopics: s.weakTopics
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    }));

    const data = {
      studyHoursWeekday,
      studyHoursWeekend,
      subjects: formattedSubjects,
    };

    const plan = generateStudyPlan(data);
    onGeneratePlan(plan);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Study Hours */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">
            Weekday Study Hours
          </label>
          <input
            type="number"
            value={studyHoursWeekday}
            onChange={(e) => setStudyHoursWeekday(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Weekend Study Hours
          </label>
          <input
            type="number"
            value={studyHoursWeekend}
            onChange={(e) => setStudyHoursWeekend(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
      </div>

      {/* Subjects */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Subjects</h3>

        {subjects.map((subject, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 space-y-2 bg-gray-50"
          >
            <input
              placeholder="Subject Name"
              value={subject.name}
              onChange={(e) =>
                handleSubjectChange(index, "name", e.target.value)
              }
              className="w-full border p-2 rounded"
              required
            />

            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Credits"
                value={subject.credits}
                onChange={(e) =>
                  handleSubjectChange(index, "credits", e.target.value)
                }
                className="border p-2 rounded"
              />

              <input
                type="number"
                min="1"
                max="5"
                placeholder="Confidence (1–5)"
                value={subject.confidence}
                onChange={(e) =>
                  handleSubjectChange(index, "confidence", e.target.value)
                }
                className="border p-2 rounded"
              />
            </div>

            <input
              placeholder="Weak topics (comma separated)"
              value={subject.weakTopics}
              onChange={(e) =>
                handleSubjectChange(index, "weakTopics", e.target.value)
              }
              className="w-full border p-2 rounded"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addSubject}
          className="text-indigo-600 text-sm"
        >
          + Add another subject
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
      >
        Generate Study Plan
      </button>
    </form>
  );
}

export default InputForm;
