import { useState } from "react";
import { Sparkles } from "lucide-react";

interface SimulationCardProps {
  agentCount: number;
  totalRank: number;
}

export function SimulationCard({ agentCount, totalRank }: SimulationCardProps) {
  const [simulationResult, setSimulationResult] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const runSimulation = () => {
    setIsRunning(true);

    // Simulate a brief delay for dramatic effect
    setTimeout(() => {
      if (agentCount < 2) {
        setSimulationResult(
          "Échec. Au moins 2 agents sont requis pour la collaboration."
        );
      } else {
        setSimulationResult(
          `Tâche collaborative réussie. Somme des rangs = ${totalRank}.`
        );
      }
      setIsRunning(false);
    }, 800);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl hover:border-purple-500/50 transition-all">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-500/20 rounded-lg">
          <Sparkles className="w-6 h-6 text-purple-400" />
        </div>
        <h2 className="text-2xl">Lancer la Simulation</h2>
      </div>

      <div className="mb-6">
        <button
          onClick={runSimulation}
          disabled={isRunning}
          className={`w-full py-4 rounded-lg transition-all shadow-lg ${
            isRunning
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 hover:shadow-purple-500/50"
          } text-white`}
        >
          {isRunning ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Simulation en cours...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              Lancer Simulation
            </span>
          )}
        </button>
      </div>

      {/* Simulation Result */}
      <div className="min-h-40">
        <h3 className="text-sm text-gray-400 mb-3">
          Résultat de la Simulation
        </h3>
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 min-h-32">
          {simulationResult ? (
            <div
              className={`p-4 rounded-lg ${
                simulationResult.includes("Échec")
                  ? "bg-red-500/10 border border-red-500/50"
                  : "bg-emerald-500/10 border border-emerald-500/50"
              }`}
            >
              <p
                className={`${
                  simulationResult.includes("Échec")
                    ? "text-red-400"
                    : "text-emerald-400"
                }`}
              >
                {simulationResult}
              </p>

              {!simulationResult.includes("Échec") && (
                <div className="mt-4 pt-4 border-t border-emerald-500/30">
                  <p className="text-sm text-gray-400 mb-2">
                    Détails de la collaboration :
                  </p>
                  <div className="space-y-1 text-sm text-gray-300">
                    <p>• Agents collaborateurs : {agentCount}</p>
                    <p>• Coefficient ontologique : {totalRank}</p>
                    <p>
                      • État du système :{" "}
                      <span className="text-emerald-400">Stable</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 text-gray-500">
              <p className="text-center text-sm">
                Cliquez sur "Lancer Simulation" pour démarrer
                <br />
                l'analyse collaborative de l'univers.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
