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
          className="border rounded-xl p-4 space-y-4 bg-gray-50"
        >
          <p className="text-sm font-semibold text-gray-600">
            Subject {index + 1}
          </p>

          {/* Subject Name */}
          <div>
            <label className="block text-sm font-medium">
              Subject Name
            </label>
            <input
              placeholder="e.g. Operating Systems"
              value={subject.name}
              onChange={(e) =>
                handleSubjectChange(index, "name", e.target.value)
              }
              className="w-full border p-2 rounded mt-1"
              required
            />
          </div>

          {/* Credits & Confidence */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">
                Credits
              </label>
              <input
                type="number"
                min="1"
                value={subject.credits}
                onChange={(e) =>
                  handleSubjectChange(index, "credits", e.target.value)
                }
                className="w-full border p-2 rounded mt-1"
              />
              <p className="text-xs text-gray-500">
                Higher credits = more study weight
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium">
                Confidence Level (1–5)
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={subject.confidence}
                onChange={(e) =>
                  handleSubjectChange(index, "confidence", e.target.value)
                }
                className="w-full border p-2 rounded mt-1"
              />
              <p className="text-xs text-gray-500">
                1 = very weak, 5 = very confident
              </p>
            </div>
          </div>

          {/* Weak Topics */}
          <div>
            <label className="block text-sm font-medium">
              Weak Topics
            </label>
            <input
              placeholder="e.g. Deadlocks, Graph Traversals"
              value={subject.weakTopics}
              onChange={(e) =>
                handleSubjectChange(index, "weakTopics", e.target.value)
              }
              className="w-full border p-2 rounded mt-1"
            />
            <p className="text-xs text-gray-500">
              Topics that require extra focus
            </p>
          </div>

          {/* Strong Topics */}
          <div>
            <label className="block text-sm font-medium">
              Strong Topics
            </label>
            <input
              placeholder="e.g. Arrays, SQL Basics"
              value={subject.strongTopics}
              onChange={(e) =>
                handleSubjectChange(index, "strongTopics", e.target.value)
              }
              className="w-full border p-2 rounded mt-1"
            />
            <p className="text-xs text-gray-500">
              Topics you are already comfortable with
            </p>
          </div>
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
