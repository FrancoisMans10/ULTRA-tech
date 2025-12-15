import { useState } from "react";
import { AgentCard } from "./components/AgentCard";
import { UniverseState } from "./components/UniverseState";
import { SimulationCard } from "./components/SimulationCard";

export interface Agent {
  id: string;
  name: string;
  rank: number;
}

function App() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [totalProposals, setTotalProposals] = useState(0);
  const [acceptedProposals, setAcceptedProposals] = useState(0);

  const addAgent = (
    name: string,
    rank: number
  ): { success: boolean; message: string } => {
    setTotalProposals((prev) => prev + 1);

    // Vérifier si un agent avec ce nom existe déjà
    const agentExists = agents.some(
      (agent) => agent.name.toLowerCase() === name.toLowerCase()
    );

    if (agentExists) {
      return {
        success: false,
        message: `Échec : Un agent nommé "${name}" existe déjà dans l'univers.`,
      };
    }

    // Vérifier si un agent avec ce rang existe déjà
    const rankExists = agents.some((agent) => agent.rank === rank);

    if (rankExists) {
      return {
        success: false,
        message: `Échec : Le rang ${rank} est déjà attribué à un autre agent.`,
      };
    }

    if (!isPrime(rank)) {
      return {
        success: false,
        message: `Échec : Le rang ${rank} n'est pas un nombre premier.`,
      };
    }

    const newAgent: Agent = {
      id: Date.now().toString(),
      name,
      rank,
    };

    setAgents([...agents, newAgent]);
    setAcceptedProposals((prev) => prev + 1);

    return {
      success: true,
      message: `Agent ${name} ajouté avec succès (Rang ${rank}).`,
    };
  };

  const removeAgent = (id: string) => {
    setAgents(agents.filter((agent) => agent.id !== id));
  };

  const isPrime = (num: number): boolean => {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;

    for (let i = 3; i <= Math.sqrt(num); i += 2) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const getTotalRank = (): number => {
    return agents.reduce((sum, agent) => sum + agent.rank, 0);
  };

  const getAcceptanceRate = (): number => {
    if (totalProposals === 0) return 0;
    return (acceptedProposals / totalProposals) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 pt-8">
          <h1 className="text-5xl mb-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent">
            ULTRA-Tech
          </h1>
          <p className="text-xl text-gray-400">PCO</p>
        </header>

        {/* Main Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: Agent Proposal */}
          <AgentCard onAddAgent={addAgent} />

          {/* Card 2: Universe State */}
          <UniverseState
            agents={agents}
            onRemoveAgent={removeAgent}
            acceptanceRate={getAcceptanceRate()}
            totalProposals={totalProposals}
          />

          {/* Card 3: Simulation */}
          <SimulationCard
            agentCount={agents.length}
            totalRank={getTotalRank()}
          />
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>SCO • Version 2.0</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
