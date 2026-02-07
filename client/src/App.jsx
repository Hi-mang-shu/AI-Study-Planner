import { useState } from "react";
import InputForm from "./components/InputForm";
import StudyPlan from "./components/StudyPlan";

function App() {
  const [plan, setPlan] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">
          AI Study Planner for Engineering Students
        </h1>

        {!plan ? (
          <InputForm onGeneratePlan={setPlan} />
        ) : (
          <StudyPlan plan={plan} />
        )}
      </div>
    </div>
  );
}

export default App;
