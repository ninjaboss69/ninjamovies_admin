import React, { useState, useRef, useEffect, useMemo } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
} from "@tanstack/react-table";
import { TbChevronsRight } from "react-icons/tb";
import Expand from "./Expand";
import Pagination from "./Pagination";

const Table = ({ columns, dataRows,page,setPage,limit,setLimit, totalItems,label }) => {

    const wrapperRef = useRef(null);
    const [visibleColumns, setVisibleColumns] = useState(columns);
    const [hiddenColumns, setHiddenColumns] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [expanded, setExpanded] = useState({});
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    useEffect(() => {
        const updateColumnsVisibility = () => {
            const wrapperWidth = wrapperRef.current?.offsetWidth || 0;
            const columnMinWidth = 150;

            let totalWidth = 0;
            const visible = [];
            const hidden = [];

            for (let col of columns) {
                const colWidth = col.width || columnMinWidth;
                if (totalWidth + colWidth <= wrapperWidth) {
                    visible.push(col);
                    totalWidth += colWidth;
                } else {
                    hidden.push(col);
                }
            }
            setVisibleColumns(visible);
            setHiddenColumns(hidden);
        };

        updateColumnsVisibility();
        window.addEventListener("resize", updateColumnsVisibility);
        return () => window.removeEventListener("resize", updateColumnsVisibility);
    }, [columns]);
    const expanderColumn = useMemo(
        () => ({
            id: "expander",
            header: ({ table }) => (
                <button
                    onClick={table.getToggleAllRowsExpandedHandler()}

                    aria-label="Toggle All Rows Expanded"
                >

                    {table.getIsAllRowsExpanded() ? <TbChevronsRight className=" rotate-90" /> : <TbChevronsRight />}
                </button>
            ),
            cell: ({ row }) => {
                const handleClick = () => {
                    row.toggleExpanded();
                };
                return (
                    <button
                        onClick={handleClick}
                        style={{ cursor: "pointer" }}

                        aria-label="Toggle Row Expanded"
                    >
                        {row.getIsExpanded() ? <TbChevronsRight className=" rotate-90" /> : <TbChevronsRight />}
                    </button>
                );
            },
            size: 40,
        }),
        []
    );

    const columnsWithExpander = useMemo(
        () => [expanderColumn, ...visibleColumns],
        [expanderColumn, visibleColumns]
    );

    const data = useMemo(() => dataRows, [dataRows]);

    const table = useReactTable({
        data,
        columns: columnsWithExpander,
        state: {
            sorting,
            expanded,
            pagination,
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onExpandedChange: setExpanded,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getRowId: (row) => row._id,
    });


    return (
        <>
            <div ref={wrapperRef} className="max-h-[50vh] xl:max-h-[70vh]  overflow-y-auto">
                <table className="min-w-full "  >
                    <thead>


                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="border-b border-gray-300 p-2 text-left cursor-pointer select-none"
                                        onClick={header.column.getToggleSortingHandler()}
                                        style={{ width: header.getSize() || 150 }}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {{
                                            asc: " 🔼",
                                            desc: " 🔽",
                                        }[header.column.getIsSorted()] ?? null}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => {
                            const isExpanded = row.getIsExpanded();
                            return (
                                <React.Fragment key={row.id}>
                                    <tr
                                        className={`border-b border-gray-200 hover:bg-green-100 even:bg-gray-100`}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <td
                                                key={cell.id}
                                                className="p-2"
                                                style={{ width: cell.column.getSize() || 150 }}
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                    {/* Render hidden columns when row is expanded */}
                                    {isExpanded && hiddenColumns.length > 0 && (
                                        <tr className="bg-gray-50">
                                            <td
                                                colSpan={row.getVisibleCells().length}
                                                className="p-4 text-sm text-gray-700"
                                            >
                                                <Expand hiddenColumns={hiddenColumns} data={row.original} />
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <Pagination
                page={page}
                setPage={setPage}
                limit={limit}
                setLimit={setLimit}
                totalItems={totalItems}
                label={label}
            />
        </>
    )
}

export default Table;