import { useState } from "react";
import { generateStudyPlan } from "../logic/planner";

function InputForm({ onGeneratePlan }) {
  const [studyHoursWeekday, setStudyHoursWeekday] = useState(3);
  const [studyHoursWeekend, setStudyHoursWeekend] = useState(6);

  const [subjects, setSubjects] = useState([]);

  const handleSubjectChange = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  const addSubject = () => {
    setSubjects([
      ...subjects,
      {
        name: "",
        credits: 3,
        confidence: 3,
        weakTopics: "",
        strongTopics: "",
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (subjects.length === 0) {
      alert("Please add at least one subject.");
      return;
    }

    const formattedSubjects = subjects.map((s) => ({
      name: s.name,
      credits: Number(s.credits),
      confidence: Number(s.confidence),
      weakTopics: s.weakTopics
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      strongTopics: s.strongTopics
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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Study Availability */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Study Availability</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">
              Weekday Study Hours (per day)
            </label>
            <input
              type="number"
              min="1"
              value={studyHoursWeekday}
              onChange={(e) => setStudyHoursWeekday(e.target.value)}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Weekend Study Hours (per day)
            </label>
            <input
              type="number"
              min="1"
              value={studyHoursWeekend}
              onChange={(e) => setStudyHoursWeekend(e.target.value)}
              className="w-full border p-2 rounded mt-1"
            />
          </div>
        </div>
      </div>

      {/* Subjects */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Subjects & Difficulty</h2>

        {subjects.length === 0 && (
          <p className="text-sm text-gray-500">
            No subjects added yet. Click below to add your first subject.
          </p>
        )}

        {subjects.map((subject, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 space-y-3 bg-gray-50"
          >
            <p className="text-sm font-semibold text-gray-600">
              Subject {index + 1}
            </p>

            <input
              placeholder="Subject Name (e.g. Operating Systems)"
              value={subject.name}
              onChange={(e) =>
                handleSubjectChange(index, "name", e.target.value)
              }
              className="w-full border p-2 rounded"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                min="1"
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

            <input
              placeholder="Strong topics (comma separated)"
              value={subject.strongTopics}
              onChange={(e) =>
                handleSubjectChange(index, "strongTopics", e.target.value)
              }
              className="w-full border p-2 rounded"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addSubject}
          className="mt-3 text-indigo-600 text-sm font-medium"
        >
          + Add subject
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
      >
        Generate Study Plan
      </button>
    </form>
  );
}

export default InputForm;
