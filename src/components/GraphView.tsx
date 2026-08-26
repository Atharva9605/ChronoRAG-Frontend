"use client";
import { useMemo } from "react";
import { Position, ReactFlow, Background, Controls, MiniMap, type Edge, type Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { GraphData } from "@/lib/types";

export default function GraphView({ data }: { data: GraphData }) {
  const { nodes, edges } = useMemo(() => {
    // Sort nodes deterministically by stage_order
    const sortedNodes = [...data.nodes].sort((a, b) => a.stage_order - b.stage_order);
    
    // Multi-row progressive timeline layout (4 columns per row)
    const COLS = 4;
    const n: Node[] = sortedNodes.map((d, index) => {
      const col = index % COLS;
      const row = Math.floor(index / COLS);
      
      return {
        id: d.id,
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        position: { x: col * 360, y: row * 180 },
        data: { 
          label: `${d.name}\n(p. ${d.pages?.join(", ") ?? d.first_page ?? ""})` 
        },
        style: {
          width: 280,
          padding: 12,
          borderRadius: 8,
          fontSize: 12,
          fontWeight: 500,
          whiteSpace: "pre-line",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          border: d.category === "major" ? "2px solid #B5582D" : "1px solid #CBD5E1",
          background: d.category === "major" ? "#FBF3ED" : "#FFFFFF",
          color: "#0E1A33",
        },
      };
    });

    const e: Edge[] = data.edges.map((d, i) => ({
      id: `e${i}`,
      source: d.src,
      target: d.dst,
      type: "smoothstep",
      animated: d.kind === "causal",
      style: {
        stroke: d.kind === "causal" ? "#B5582D" : "#94A3B8",
        strokeWidth: d.kind === "causal" ? 2 : 1.5,
      },
    }));
    return { nodes: n, edges: e };
  }, [data]);

  return (
    <div className="h-[70vh] rounded-xl border border-[var(--color-line)] bg-white">
      <ReactFlow nodes={nodes} edges={edges} fitView minZoom={0.1}
                 proOptions={{ hideAttribution: false }}>
        <Background color="#E6E2DA" gap={20} />
        <Controls />
        <MiniMap pannable zoomable />
      </ReactFlow>
    </div>
  );
}
