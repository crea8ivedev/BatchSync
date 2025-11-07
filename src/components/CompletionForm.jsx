import React from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Formik, Form } from "formik";

import { NumberInput, Button } from "../components/ui";
import { useManufacturingStore } from "../stores/manufacturingStore";

const CompletionForm = ({ batchId, onClose }) => {
  const { operator, batches, updateBatch, addLot } = useManufacturingStore((state) => state);
  const batch = batches.find((b) => b.id === batchId);

  if (!batch) return null;

  const initialValues = {
    yieldQty: 0,
    scrapQty: 0,
    materialQtys: batch.materials.reduce((acc, m) => {
      acc[m.name] = 0;
      return acc;
    }, {}),
  };

  const validationSchema = Yup.object().shape({
    yieldQty: Yup.number()
      .required("Actual Yield is required")
      .min(0, "Yield must be 0 or greater")
      .typeError("Yield must be a valid number"),
    scrapQty: Yup.number()
      .min(0, "Scrap must be 0 or greater")
      .typeError("Scrap must be a valid number"),
    materialQtys: Yup.object().shape(
      batch.materials.reduce((acc, m) => {
        acc[m.name] = Yup.number()
          .required(`${m.name} quantity is required`)
          .min(1, `${m.name} quantity must be greater then 0`)
          .typeError(`${m.name} must be a valid number`);
        return acc;
      }, {})
    ),
  });

  const handleSubmit = (values) => {
    const lotId = `LOT-${batchId}-01`;
    const inputs = batch.materials.map((m) => ({
      material: m.name,
      qty: values.materialQtys[m.name] || 0,
    }));

    const endTime = new Date().toISOString();
    const durationSeconds = batch.startTime
      ? Math.max(0, Math.floor((new Date(endTime) - new Date(batch.startTime)) / 1000))
      : undefined;

    updateBatch(batchId, {
      status: "Completed",
      endTime,
      yield: values.yieldQty,
      scrap: values.scrapQty,
      lotId,
      operator,
      completedBy: operator,
    });

    addLot({
      lot: lotId,
      product: batch.product,
      yield: values.yieldQty,
      inputs,
      completedBy: operator,
      completedAt: endTime,
      durationSeconds,
    });

    toast.success(`Batch ${batchId} completed by ${operator}!`);
    onClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
      validateOnChange
      validateOnBlur
    >
{({ isSubmitting }) => (
  <Form className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 border border-gray-200 z-[1000] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
    {/* Header */}
    <div className="border-b border-gray-200 pb-4 mb-4">
      <h3 className="text-2xl font-semibold text-gray-800">
        Complete Batch {batch.id}
      </h3>
      <p className="text-sm text-gray-500 mt-1">
        Fill in the final yield and materials used for this batch.
      </p>
    </div>

    {/* Batch Info */}
    <div className="space-y-4 mb-6">
      <div className="flex items-center gap-2 text-gray-700">
        <span className="font-medium text-gray-800">Lot:</span>
        <span className="text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1 rounded-md">
          {batch.lotId || `LOT-${batchId}-01`}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <NumberInput
          name="yieldQty"
          label="Actual Yield"
          required
          min={0}
          step={1}
          className="mb-0"
        />
        <NumberInput
          name="scrapQty"
          label="Scrap"
          min={0}
          step={1}
          className="mb-0"
        />
      </div>
    </div>

    {/* Materials Section */}
    <div className="mb-6">
      <h4 className="font-semibold text-gray-800 mb-3">Materials Used</h4>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 border-b border-gray-200">Material</th>
              <th className="px-4 py-3 border-b border-gray-200">Actual Qty</th>
            </tr>
          </thead>
          <tbody>
            {batch.materials.map((m) => (
              <tr
                key={m.name}
                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <td className="px-4 py-2 border-b border-gray-200">{m.name}</td>
                <td className="px-4 py-2 border-b border-gray-200">
                  <NumberInput
                    name={`materialQtys.${m.name}`}
                    min={0}
                    step={1}
                    size="md"
                    className="mb-0 w-full"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Actions */}
    <div className="flex gap-3 justify-end border-t border-gray-200 pt-4">
      <Button
        type="button"
        variant="secondary"
        onClick={onClose}
        className="px-5 py-2 rounded-lg"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        variant="success"
        disabled={isSubmitting}
        className="px-5 py-2 rounded-lg"
      >
        {isSubmitting ? "Saving..." : "Save & Finish"}
      </Button>
    </div>
  </Form>
)}

    </Formik>
  );
};

export default CompletionForm;
