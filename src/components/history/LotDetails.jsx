import LotGraph from "./LotGraph";
import { formatDuration } from "../../utils/helpers/formatDate";

const LotDetails = ({ lot }) => {
  if (!lot) return null;

  return (
    <div className="er-digram-wrap w-full  xl:px-0  max-w-[1440px] mx-auto  items-center px-5  xl:pt-[60px] xl:pb-[60px] h-screen pt-[30px] pb-[30px]
    ">
      <div className="flex flex-wrap justify-center xl:gap-10 gap-5 items-strech ">
        <div className="xl:w-4/12 lg:w-4/12 w-full xl:p-8 p-5 border-green-600 border-solid border-[1.5px] rounded-2xl">
          <h2 className=" xl:text-3xl text-2xl font-semibold mb-6">Details: {lot.lot}</h2>
          <p className="mb-1">Product: {lot.product}</p>
          <p className="mb-1">Yield: {lot.yield}</p>
          <p className="mb-1">Completed By: {lot.completedBy || lot.operator || "—"}</p>
          <p className="mb-1">Completed At: {lot.completedAt ? new Date(lot.completedAt).toLocaleString() : "—"}</p>
          <p className="mb-10">
            Time to Complete: {" "}
            {typeof lot.durationSeconds === "number" ? formatDuration(lot.durationSeconds) : "—"}
          </p>
          <h3 className="text-xl font-semibold mb-4 text-black">Ingredients:</h3>
          <ul className="list-disc list-inside mb-4">
            {lot.inputs.map((input, i) => (
              <li key={i}>
                {input.material}: {input.qty}
              </li>
            ))}
          </ul>
        </div>
        <div className="xl:w-7/12 lg:w-7/12 w-full border-gray-300 border-1 border-solid lg:p-10 rounded-2xl">
          <LotGraph lot={lot} />

        </div>
      </div>
    </div>
  );
};

export default LotDetails;
