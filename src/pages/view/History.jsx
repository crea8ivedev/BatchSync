import React from "react";
import { useManufacturingStore } from "../../stores/manufacturingStore";
import HistoryTable from "../../components/history/HistoryTable";

const History = () => {
  const lots = useManufacturingStore((state) => state.lots);

  return (
        <div className="px-5 history-table pt-12 pb-12">
    <div className="max-w-[1440px] mx-auto w-full ">
      <h2 className="text-3xl lg:text-4xl font-semibold mb-8">Production History</h2>
      <HistoryTable lots={lots} />
    </div>
    </div>
  );
};

export default History;
