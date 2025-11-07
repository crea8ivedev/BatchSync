import React from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import { formatDuration } from "../../utils/helpers/formatDate";

const LotGraph = ({ lot }) => {
  if (!lot) return null;

  const rootId = "root";
  const yieldId = "yield";
  const completedBy = "completedBy";
  const timeId = "time";
  const ingredientsId = "ingredients";

  const nodes = [
    {
      id: rootId,
      data: { label: `Product: ${lot.product}` },
      position: { x: 360, y: 0 },
    },
    {
      id: "details",
      data: { label: "Details" },
      position: { x: 100, y: 120 },
    },
    {
      id: yieldId,
      data: { label: `Yield: ${lot.yield}` },
        position: { x: -120, y: 240 },
    },
    {
      id: completedBy,
      data: { label: `Completed By: ${lot.completedBy || lot.operator || "—"}` },
      position: { x: 40, y: 240 },
    },
    {
      id: timeId,
      data: {
        label: `Time to Complete: ${
          typeof lot.durationSeconds === "number" ? formatDuration(lot.durationSeconds) : "—"
        }`,
      },
      position: { x: 200, y: 240 },
    },
    {
      id: ingredientsId,
      data: { label: "Ingredients" },
      position: { x: 640, y: 120 },
    },
  ];

  const ingredientNodes = (lot.inputs || []).map((input, index) => {
    const id = `ing-${index}`;
    return {
      id,
      data: { label: `${input.material}: ${input.qty}` },
      position: { x: 480 + index * 160, y: 240 },
    };
  });

  const edges = [
    { id: "e-root-details", source: rootId, target: "details" },
    { id: "e-details-yield", source: "details", target: yieldId },
    { id: "e-details-completed", source: "details", target: completedBy },
    { id: "e-details-time", source: "details", target: timeId },
    { id: "e-root-ingredients", source: rootId, target: ingredientsId },
    ...ingredientNodes.map((n) => ({
      id: `e-ingredients-${n.id}`,
      source: ingredientsId,
      target: n.id,
    })),
  ];

  return (
    <div style={{ height: 360 }}>
      <ReactFlow nodes={[...nodes, ...ingredientNodes]} edges={edges} />
    </div>
  );
};

export default LotGraph;
