import { useState } from "react";
import InputForm from "./components/InputForm";
import StudyPlan from "./components/StudyPlan";

function App() {
  const [plan, setPlan] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-4">
      {/* Header */}
      <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
        AI Study Planner for Engineering Students
      </h1>

      {/* Main Content */}
      <div className="w-full bg-white p-6 rounded-xl shadow">
        {!plan ? (
          <InputForm onGeneratePlan={setPlan} />
        ) : (
          <StudyPlan plan={plan} onBack={() => setPlan(null)} />
        )}
      </div>
    </div>
  );
}

export default App;
