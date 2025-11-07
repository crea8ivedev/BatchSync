import React from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/tailwindMarge/cn";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { operators } from "../../data/mockData";
import { useManufacturingStore } from "../../stores/manufacturingStore";

import Button from "../../components/ui/Button";

const OperatorSelector = () => {
  const { operator, setOperator } = useManufacturingStore((state) => state);
  const navigate = useNavigate();

  const initialValues = {
    operator: operator || "",
  };

  const validationSchema = Yup.object().shape({
    operator: Yup.string()
      .required("Please select an operator")
      .oneOf(operators, "Please select a valid operator"),
  });

  const handleSubmit = (values) => {
    setOperator(values.operator);
    toast.success(`Welcome, ${values.operator}!`);
    navigate("/dashboard");
  };

  return (
    <div className="login-form max-w-md mx-auto mt-8 px-5">
      <h2 className="text-xl font-semibold mb-4">Select Operator</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <Field
                as="select"
                name="operator"
                className={cn(
                  "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                  errors.operator && touched.operator ? "border-red-500" : "border-gray-300"
                )}
              >
                <option value="">Choose...</option>
                {operators.map((op) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="operator" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <Button type="submit" variant="primary" disabled={isSubmitting} fullWidth>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OperatorSelector;
