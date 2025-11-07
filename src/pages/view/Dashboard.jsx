import { useState } from "react";
import Timer from "../../components/Timer";
import toast from "react-hot-toast";
import { differenceInSeconds } from "date-fns";

import { cn } from "../../utils/tailwindMarge/cn";
import Button from "../../components/ui/Button";
import CompletionForm from "../../components/CompletionForm";
import { useManufacturingStore } from "../../stores/manufacturingStore";
import getStatusClasses from "../../utils/helpers/statusColor";

const Dashboard = () => {
  const [openForm, setOpenForm] = useState(null);

  const { operator, batches, updateBatch } = useManufacturingStore((state) => state);

  const handleStart = (id) => {
    updateBatch(id, {
      status: "In Process",
      startTime: new Date().toISOString(),
      elapsedSeconds: 0,
    });
    toast.success(`${operator} started batch ${id}`);
  };

  const handlePause = (id) => {
    const batch = batches.find((b) => b.id === id);
    if (batch && batch.startTime) {
      const elapsed = differenceInSeconds(new Date(), new Date(batch.startTime));

      updateBatch(id, {
        status: "Paused",
        elapsedSeconds: elapsed,
        pauseTime: new Date().toISOString(),
      });
      toast.success(`${operator} paused batch ${id}`);
    }
  };

  const handleResume = (id) => {
    const batch = batches.find((b) => b.id === id);
    if (batch) {
      const elapsedSeconds = batch.elapsedSeconds || 0;
      const newStartTime = new Date();
      newStartTime.setSeconds(newStartTime.getSeconds() - elapsedSeconds);

      updateBatch(id, {
        status: "In Process",
        startTime: newStartTime.toISOString(),
        pauseTime: null,
      });
      toast.success(`${operator} resumed batch ${id}`);
    }
  };

  const handleComplete = (id) => {
    setOpenForm(id);
  };

  return (
    <div className="px-5">
    <div className="max-w-[1440px] mx-auto w-full pt-12 pb-12">
      <h2 className="text-3xl lg:text-4xl font-semibold mb-8">Active Batches</h2>
      <div className="grid min-[1440px]:!grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
      {batches.map((batch) => (
        <div
          key={batch.id}
          className={cn(
            "p-4 md:p-7 rounded-2xl  flex flex-col justify-between h-full min-h-[262px]",
            getStatusClasses(batch.status)
          )}
        >
        <div>
          <h3 className="text-xl font-semibold mb-4 text-black">
            {batch.id}: {batch.product}
          </h3>
          <p className="text-black mb-2">
            Target: {batch.targetQty} {batch.uom}
          </p>
          <p className="text-black mb-2">Status: {batch.status}</p>
          {batch.startTime && batch.status === "In Process" && (
            <p className="text-black mb-2">
              Running: <Timer startTime={batch.startTime} status={batch.status} />
            </p>
          )}
          {batch.status === "Paused" && batch.elapsedSeconds !== undefined && (
            <p className="text-black mb-2">
              Paused at:{" "}
              <Timer
                startTime={batch.pauseTime || batch.startTime}
                status={batch.status}
                elapsedSeconds={batch.elapsedSeconds}
              />
            </p>
          )}
          </div>
          <div className="mt-3 flex gap-2">
            {batch.status === "Planned" && (
              <Button variant="primary" onClick={() => handleStart(batch.id)} className="m-1.5">
                Start
              </Button>
            )}
            {batch.status === "In Process" && (
              <>
                <Button variant="warning" onClick={() => handlePause(batch.id)} className="m-1.5">
                  Pause
                </Button>
                <Button
                  variant="success"
                  onClick={() => handleComplete(batch.id)}
                  className="m-1.5"
                >
                  Complete
                </Button>
              </>
            )}
            {batch.status === "Paused" && (
              <>
                <Button variant="secondary" onClick={() => handleResume(batch.id)} className="m-1.5">
                  Resume
                </Button>
                <Button
                  variant="success"
                  onClick={() => handleComplete(batch.id)}
                  className="m-1.5"
                >
                  Complete
                </Button>
              </>
            )}
          </div>
        </div>
      ))}
      {openForm && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setOpenForm(null)} />
          <CompletionForm batchId={openForm} onClose={() => setOpenForm(null)} />
        </>
      )}
    </div>
</div>
</div>
  );
};

export default Dashboard;
