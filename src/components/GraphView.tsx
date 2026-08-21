"use client";
import { useMemo } from "react";
import { ReactFlow, Background, Controls, MiniMap, type Edge, type Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { GraphData } from "@/lib/types";

export default function GraphView({ data }: { data: GraphData }) {
  const { nodes, edges } = useMemo(() => {
    const laneCount: Record<number, number> = {};
    const n: Node[] = data.nodes.map((d) => {
      const lane = d.stage_order;
      const idx = (laneCount[lane] = (laneCount[lane] ?? 0) + 1) - 1;
      return {
        id: d.id,
        position: { x: lane * 420, y: idx * 110 },
        data: { label: `${d.name}\np. ${d.pages?.join(", ") ?? ""}` },
        style: {
          width: 320,
          padding: 10,
          borderRadius: 10,
          fontSize: 12,
          whiteSpace: "pre-line",
          border: d.category === "major" ? "1.5px solid #B5582D" : "1px solid #E6E2DA",
          background: d.category === "major" ? "#F3E7DF" : "#ffffff",
          color: "#0E1A33",
        },
      };
    });
    const e: Edge[] = data.edges.map((d, i) => ({
      id: `e${i}`,
      source: d.src,
      target: d.dst,
      animated: d.kind === "causal",
      style: {
        stroke: d.kind === "causal" ? "#B5582D" : "#C9D5EA",
        strokeWidth: d.kind === "causal" ? 1.5 : 1,
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
