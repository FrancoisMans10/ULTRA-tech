import { Network, Users, TrendingUp, Trash2 } from "lucide-react";
import type { Agent } from "../App";

interface UniverseStateProps {
  agents: Agent[];
  onRemoveAgent: (id: string) => void;
  acceptanceRate: number;
  totalProposals: number;
}

export function UniverseState({
  agents,
  onRemoveAgent,
  acceptanceRate,
  totalProposals,
}: UniverseStateProps) {
  // Calculate positions for agents in a circle
  const getNodePositions = (count: number) => {
    const centerX = 100;
    const centerY = 70;
    const radius = 50;

    return Array.from({ length: count }, (_, i) => {
      const angle = (i * 2 * Math.PI) / count - Math.PI / 2; // Start from top
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    });
  };

  const positions = getNodePositions(agents.length);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl hover:border-emerald-500/50 transition-all">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-500/20 rounded-lg">
          <Network className="w-6 h-6 text-emerald-400" />
        </div>
        <h2 className="text-2xl">État Actuel de l'Univers</h2>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-cyan-400" />
            <p className="text-xs text-gray-400">Total Agents</p>
          </div>
          <p className="text-2xl text-cyan-400">{agents.length}</p>
        </div>
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <p className="text-xs text-gray-400">Taux d'Acceptation</p>
          </div>
          <p className="text-2xl text-emerald-400">
            {totalProposals === 0 ? "N/A" : `${acceptanceRate.toFixed(1)}%`}
          </p>
        </div>
      </div>

      {/* Enhanced Visual Graph Representation */}
      <div className="mb-6 relative h-64 bg-gradient-to-br from-gray-900/80 via-cyan-950/20 to-gray-900/80 border border-cyan-500/30 rounded-lg overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),transparent_70%)]" />

        <div className="absolute inset-0 flex items-center justify-center">
          {agents.length === 0 ? (
            <p className="text-gray-500 text-sm">Aucun agent à visualiser</p>
          ) : (
            <svg className="w-full h-full" viewBox="0 0 200 140">
              {/* Draw all connections between nodes (complete graph) */}
              {agents.map((_, i) =>
                agents.slice(i + 1).map((_, j) => {
                  const actualJ = i + j + 1;
                  return (
                    <line
                      key={`line-${i}-${actualJ}`}
                      x1={positions[i].x}
                      y1={positions[i].y}
                      x2={positions[actualJ].x}
                      y2={positions[actualJ].y}
                      stroke="rgba(34, 211, 238, 0.2)"
                      strokeWidth="0.5"
                    >
                      <animate
                        attributeName="stroke-opacity"
                        values="0.2;0.5;0.2"
                        dur="3s"
                        repeatCount="indefinite"
                        begin={`${(i + actualJ) * 0.2}s`}
                      />
                    </line>
                  );
                })
              )}

              {/* Draw nodes */}
              {agents.map((agent, index) => {
                const pos = positions[index];
                const colors = [
                  {
                    outer: "rgba(34, 211, 238, 0.3)",
                    inner: "rgb(34, 211, 238)",
                  },
                  {
                    outer: "rgba(16, 185, 129, 0.3)",
                    inner: "rgb(16, 185, 129)",
                  },
                  {
                    outer: "rgba(139, 92, 246, 0.3)",
                    inner: "rgb(139, 92, 246)",
                  },
                  {
                    outer: "rgba(244, 63, 94, 0.3)",
                    inner: "rgb(244, 63, 94)",
                  },
                  {
                    outer: "rgba(251, 191, 36, 0.3)",
                    inner: "rgb(251, 191, 36)",
                  },
                ];
                const color = colors[index % colors.length];

                return (
                  <g key={agent.id}>
                    {/* Outer glow ring */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="8"
                      fill={color.outer}
                      stroke={color.inner}
                      strokeWidth="1.5"
                    >
                      <animate
                        attributeName="r"
                        values="8;11;8"
                        dur="2s"
                        repeatCount="indefinite"
                        begin={`${index * 0.3}s`}
                      />
                      <animate
                        attributeName="opacity"
                        values="0.6;1;0.6"
                        dur="2s"
                        repeatCount="indefinite"
                        begin={`${index * 0.3}s`}
                      />
                    </circle>
                    {/* Inner solid core */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="4"
                      fill={color.inner}
                      opacity="0.9"
                    />
                    {/* Label */}
                    <text
                      x={pos.x}
                      y={pos.y - 15}
                      textAnchor="middle"
                      fill={color.inner}
                      fontSize="7"
                      fontWeight="600"
                    >
                      {agent.name}
                    </text>
                    {/* Rank */}
                    <text
                      x={pos.x}
                      y={pos.y + 20}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.6)"
                      fontSize="6"
                    >
                      R:{agent.rank}
                    </text>
                  </g>
                );
              })}
            </svg>
          )}
        </div>
      </div>

      {/* Agent List with delete functionality */}
      <div>
        <h3 className="text-sm text-gray-400 mb-3">Agents Actifs</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          {agents.length === 0 ? (
            <p className="text-gray-500 text-sm italic">
              Aucun agent dans le système
            </p>
          ) : (
            agents.map((agent) => (
              <div
                key={agent.id}
                className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 flex items-center justify-between hover:border-cyan-500/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  <span className="text-gray-100">{agent.name}</span>
                  <span className="text-cyan-400 text-sm">
                    Rang: {agent.rank}
                  </span>
                </div>
                <button
                  onClick={() => onRemoveAgent(agent.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-red-500/20 rounded-lg"
                  title="Supprimer l'agent"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
