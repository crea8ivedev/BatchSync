import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useManufacturingStore } from "../../stores/manufacturingStore";
import LotDetails from "../../components/history/LotDetails";

const HistoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const lots = useManufacturingStore((state) => state.lots);

  const lot = React.useMemo(() => lots.find((l) => l.lot === id) || null, [lots, id]);

  if (!lot) {
    return (
      <div>
        <p className="mb-4">Lot not found.</p>
        <button className="text-blue-600 hover:text-blue-800" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return <LotDetails lot={lot} onBack={() => navigate(-1)} />;
};

export default HistoryDetails;
