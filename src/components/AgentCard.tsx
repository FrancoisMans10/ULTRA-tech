import { useState } from "react";
import { UserPlus } from "lucide-react";

interface AgentCardProps {
  onAddAgent: (
    name: string,
    rank: number
  ) => { success: boolean; message: string };
}

export function AgentCard({ onAddAgent }: AgentCardProps) {
  const [name, setName] = useState("");
  const [rank, setRank] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setResultMessage("Veuillez entrer un nom.");
      setIsSuccess(false);
      return;
    }

    const rankNum = parseInt(rank);
    if (isNaN(rankNum)) {
      setResultMessage("Veuillez entrer un rang valide.");
      setIsSuccess(false);
      return;
    }

    const result = onAddAgent(name.trim(), rankNum);
    setResultMessage(result.message);
    setIsSuccess(result.success);

    if (result.success) {
      setName("");
      setRank("");
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl hover:border-cyan-500/50 transition-all">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-cyan-500/20 rounded-lg">
          <UserPlus className="w-6 h-6 text-cyan-400" />
        </div>
        <h2 className="text-2xl">Ajouter un Agent</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="agent-name"
            className="block text-sm text-gray-300 mb-2"
          >
            Nom
          </label>
          <input
            id="agent-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            placeholder="Ex: Beta"
          />
        </div>

        <div>
          <label
            htmlFor="agent-rank"
            className="block text-sm text-gray-300 mb-2"
          >
            Rang
          </label>
          <input
            id="agent-rank"
            type="number"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-2.5 text-gray-100 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            placeholder="Ex: 11"
          />
          <p className="text-xs text-gray-400 mt-1.5">
            (Doit être un nombre premier positif : 2, 3, 5, 7, 11, 13...)
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 rounded-lg transition-all shadow-lg hover:shadow-cyan-500/50"
        >
          Proposer Agent
        </button>
      </form>

      {resultMessage && (
        <div
          className={`mt-4 p-4 rounded-lg border ${
            isSuccess
              ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
              : "bg-red-500/10 border-red-500/50 text-red-400"
          }`}
        >
          <p className="text-sm">{resultMessage}</p>
        </div>
      )}
    </div>
  );
}
