import { useState } from "react";
import { predictCampaign } from "../services/predictionService";

export default function AIPrediction() {

  const [result, setResult] = useState<any>(null);

  const handlePredict = async () => {

    const res = await predictCampaign({
      goal: 50000,
      duration: 30,
      category: "tech"
    });

    setResult(res);

  };

  return (

    <div className="bg-white/5 p-6 rounded-xl border border-white/10">

      <h2 className="text-xl text-white mb-4">
        AI Campaign Success Predictor
      </h2>

      <button
        onClick={handlePredict}
        className="bg-cyan-500 px-4 py-2 rounded-lg text-white"
      >
        Predict Campaign
      </button>

      {result && (
        <div className="mt-4 text-green-400 text-lg">
          Success Probability: {result.probability}%
        </div>
      )}

    </div>

  );
}