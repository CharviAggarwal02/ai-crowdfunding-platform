import { useState } from "react";
import { predictCampaign } from "../services/predictionService";

export default function Predict() {
  const [goal, setGoal] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("");
  const [result, setResult] = useState(null);

  async function handlePredict(e) {
    e.preventDefault();

    const response = await predictCampaign({
      goal: Number(goal),
      duration: Number(duration),
      category: category
    });

    setResult(response.prediction);
  }

  return (
    <div>
      <h2>Campaign Success Prediction</h2>

      <form onSubmit={handlePredict}>
        <input
          type="number"
          placeholder="Goal Amount"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />

        <input
          type="number"
          placeholder="Duration (days)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button type="submit">Predict Success</button>
      </form>

      {result !== null && (
        <h3>Success Probability: {result}</h3>
      )}
    </div>
  );
}