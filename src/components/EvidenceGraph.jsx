import React, { useMemo, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Network, Maximize2, ShieldCheck, ShieldAlert, AlertCircle, FileText } from 'lucide-react';

/**
 * Custom Claim Node Component
 */
function ClaimNode({ data, selected }) {
  const isWeakest = data.isWeakest;
  const isSelected = selected || data.isSelected;

  return (
    <div
      className={`px-3.5 py-2.5 rounded-sm bg-[#0d0d0d] border transition-all duration-200 w-64 shadow-lg ${
        isSelected
          ? 'border-white ring-1 ring-white/30 bg-[#161616]'
          : isWeakest
            ? 'border-red-500/70'
            : 'border-[#262626] hover:border-[#444]'
      }`}
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-sm bg-black border border-[#333] flex items-center justify-center text-[10px] font-mono font-bold text-white">
            {data.label}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717a]">
            Claim Unit
          </span>
        </div>

        <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded-sm border ${
          (data.score ?? 0) >= 80
            ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/40'
            : (data.score ?? 0) >= 50
              ? 'bg-amber-950/40 text-amber-400 border-amber-800/40'
              : 'bg-red-950/40 text-red-400 border-red-800/40'
        }`}>
          {data.score !== undefined ? `${data.score}%` : 'N/A'}
        </span>
      </div>

      <p className="text-[11px] text-[#e4e4e7] line-clamp-2 font-sans leading-snug">
        {data.text}
      </p>

      {isWeakest && (
        <div className="mt-1.5 pt-1 border-t border-[#1e1e1e] text-[9px] font-mono text-red-400 uppercase tracking-wide">
          &bull; Weakest Link Bound
        </div>
      )}

      {/* Output handle on right */}
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-white !w-2 !h-2 !border-black"
      />
    </div>
  );
}

/**
 * Custom Evidence Node Component
 */
function EvidenceNode({ data, selected }) {
  const isSelected = selected || data.isSelected;

  return (
    <div
      className={`px-3.5 py-2.5 rounded-sm bg-[#0a0a0a] border transition-all duration-200 w-64 shadow-lg ${
        isSelected
          ? 'border-white ring-1 ring-white/30 bg-[#141414]'
          : 'border-[#262626] hover:border-[#444]'
      }`}
    >
      {/* Input handle on left */}
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-[#888] !w-2 !h-2 !border-black"
      />

      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-sm bg-[#181818] border border-[#333] flex items-center justify-center text-[10px] font-mono font-bold text-[#d4d4d8]">
            {data.label}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717a] truncate max-w-[120px]">
            Passage #{data.chunkIndex ?? 0}
          </span>
        </div>

        <span className="text-[10px] font-mono text-white px-1.5 py-0.2 rounded-sm bg-black border border-[#262626]">
          Sim: {data.relevance ?? 0.9}
        </span>
      </div>

      <div className="text-[10px] font-mono text-[#a1a1aa] truncate mb-1">
        {data.docTitle}
      </div>

      <p className="text-[11px] text-[#8e8e93] line-clamp-2 font-sans leading-snug">
        {data.text}
      </p>
    </div>
  );
}

const nodeTypes = {
  claimNode: ClaimNode,
  evidenceNode: EvidenceNode
};

export default function EvidenceGraph({
  claims = [],
  retrievedEvidence = [],
  selectedClaimId = null,
  selectedEvidenceId = null,
  weakestClaimId = null,
  onSelectClaim,
  onSelectEvidence
}) {
  // Build React Flow nodes and edges dynamically based on claims & retrievedEvidence
  const initialElements = useMemo(() => {
    const rawNodes = [];
    const rawEdges = [];

    // Position Claims on the Left Column
    claims.forEach((claim, idx) => {
      rawNodes.push({
        id: `node-claim-${claim.id}`,
        type: 'claimNode',
        position: { x: 30, y: 30 + idx * 135 },
        data: {
          id: claim.id,
          label: claim.id,
          text: claim.text,
          score: claim.claimScore,
          isWeakest: claim.id === weakestClaimId,
          isSelected: claim.id === selectedClaimId
        }
      });

      // Generate edges for this claim's relations
      (claim.evidenceRelations || []).forEach((rel, rIdx) => {
        const isSupport = rel.relationType === 'SUPPORT';
        const isContradict = rel.relationType === 'CONTRADICT';

        let strokeColor = '#71717a';
        let edgeDash = undefined;
        let labelText = 'Gap';

        if (isSupport) {
          strokeColor = '#22c55e';
          labelText = `Sup ${(rel.supportingSimilarity || 0).toFixed(2)}`;
        } else if (isContradict) {
          strokeColor = '#ef4444';
          edgeDash = '5,5';
          labelText = `Con ${(rel.contradictingSimilarity || 0).toFixed(2)}`;
        }

        const isHighlighted = selectedClaimId === claim.id || selectedEvidenceId === rel.evidenceId;

        rawEdges.push({
          id: `edge-${claim.id}-${rel.evidenceId}-${rIdx}`,
          source: `node-claim-${claim.id}`,
          target: `node-evidence-${rel.evidenceId}`,
          animated: isHighlighted,
          style: {
            stroke: strokeColor,
            strokeWidth: isHighlighted ? 2.5 : 1.5,
            strokeDasharray: edgeDash,
            opacity: (!selectedClaimId && !selectedEvidenceId) || isHighlighted ? 1 : 0.25
          },
          label: labelText,
          labelStyle: {
            fill: isSupport ? '#4ade80' : isContradict ? '#f87171' : '#a1a1aa',
            fontSize: 10,
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 600
          },
          labelBgStyle: {
            fill: '#080808',
            fillOpacity: 0.95,
            stroke: strokeColor,
            strokeWidth: 1,
            rx: 3,
            ry: 3
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: strokeColor,
            width: 14,
            height: 14
          }
        });
      });
    });

    // Position Evidence Nodes on the Right Column
    retrievedEvidence.forEach((ev, idx) => {
      rawNodes.push({
        id: `node-evidence-${ev.id}`,
        type: 'evidenceNode',
        position: { x: 420, y: 30 + idx * 145 },
        data: {
          id: ev.id,
          label: ev.id,
          docTitle: ev.docTitle || ev.title,
          text: ev.text,
          chunkIndex: ev.chunkIndex,
          relevance: ev.relevanceScore,
          isSelected: ev.id === selectedEvidenceId
        }
      });
    });

    return { nodes: rawNodes, edges: rawEdges };
  }, [claims, retrievedEvidence, selectedClaimId, selectedEvidenceId, weakestClaimId]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialElements.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialElements.edges);

  useEffect(() => {
    setNodes(initialElements.nodes);
    setEdges(initialElements.edges);
  }, [initialElements, setNodes, setEdges]);

  const handleNodeClick = (_, node) => {
    if (node.type === 'claimNode') {
      if (onSelectClaim) onSelectClaim(node.data.id);
    } else if (node.type === 'evidenceNode') {
      if (onSelectEvidence) onSelectEvidence(node.data.id);
    }
  };

  return (
    <div className="bg-[#080808] border border-[#1c1c1c] rounded-sm p-4 sm:p-5 flex flex-col h-[560px]">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#161616]">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-[#a1a1aa]" />
          <h3 className="font-display font-bold text-base uppercase tracking-wider text-white">
            Interactive Evidence Graph
          </h3>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-sm bg-[#121212] text-[#71717a] border border-[#222]">
            Bipartite Mapping
          </span>
        </div>

        {/* Legend */}
        <div className="hidden sm:flex items-center gap-4 text-[10px] font-mono">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2.5 h-0.5 bg-emerald-500 inline-block" />
            <span>Support</span>
          </div>
          <div className="flex items-center gap-1.5 text-red-400">
            <span className="w-2.5 h-0.5 bg-red-500 inline-block border-b border-dashed border-red-400" />
            <span>Contradiction</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <span className="w-2.5 h-0.5 bg-zinc-500 inline-block border-b border-dashed border-zinc-400" />
            <span>Gap / Void</span>
          </div>
        </div>
      </div>

      {/* React Flow Canvas */}
      <div className="flex-1 w-full h-full relative rounded-sm overflow-hidden border border-[#161616] bg-[#030303]">
        {claims.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-zinc-500 font-mono text-xs">
            <AlertCircle className="w-6 h-6 mb-2 text-zinc-600" />
            <span>No claim nodes present in current scenario.</span>
          </div>
        ) : (
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={handleNodeClick}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.25 }}
            minZoom={0.4}
            maxZoom={1.5}
            proOptions={{ hideAttribution: true }}
          >
            <Background color="#161616" gap={20} size={1} />
            <Controls showInteractive={false} />
            <MiniMap 
              nodeColor={(n) => n.type === 'claimNode' ? '#ffffff' : '#444444'}
              maskColor="rgba(0, 0, 0, 0.85)"
              style={{
                backgroundColor: '#0a0a0a',
                border: '1px solid #222222',
                borderRadius: '4px'
              }}
            />
          </ReactFlow>
        )}
      </div>

      {/* Footer controls hint */}
      <div className="mt-3 pt-2 border-t border-[#141414] flex items-center justify-between text-[10px] font-mono text-[#52525b]">
        <span>Scroll to zoom &middot; Drag to pan canvas &middot; Click any node to synchronize panels</span>
        <span>Graph Engine: React Flow v12</span>
      </div>
    </div>
  );
}
