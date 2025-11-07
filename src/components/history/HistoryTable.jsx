import  { useMemo } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

import { cn } from "../../utils/tailwindMarge/cn";
import { BsEye } from "react-icons/bs";

const HistoryTable = ({ lots }) => {
  const navigate = useNavigate();
  const data = useMemo(() => lots, [lots]);
  const columnHelper = useMemo(() => createColumnHelper(), []);

  const columns = useMemo(
    () => [
      columnHelper.accessor("lot", {
        header: "Lot ID",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("product", {
        header: "Product",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("yield", {
        header: "Yield",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("completedBy", {
        header: "Completed By",
        cell: (info) => info.getValue() || "—",
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <Link to={`/history/${info.row.original.lot}`}>
            <BsEye />
          </Link>
        ),
      }),
    ],
    [columnHelper]
  );

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="
            ">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className=" bg-[#D0CEFF] border border-gray-300 p-2 text-left">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => navigate(`/history/${row.original.lot}`)}
              className={cn("cursor-pointer transition-colors", "hover:bg-gray-50")}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border border-gray-300 p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
