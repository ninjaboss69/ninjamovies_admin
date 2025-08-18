import React from "react";
import { useTable,useExpanded,useSortBy,useColumnOrder } from "react-table";


const Table = ({ dataColumns, dataRows, onRowClick }) => {
    console.log('columns', dataColumns, 'rows', dataRows);
    const columns = React.useMemo(() => dataColumns, [dataColumns]);
    const data = React.useMemo(() => dataRows, [dataRows]);
    const tableInstance = useTable({
    columns,
    data,
    manualPagination: true,
    // initialState: {hiddenColumns}
},
     useSortBy, useExpanded
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance;  
    return(

    <div>
        <table className="min-w-full "  {...getTableProps()}>
            <thead>

                {headerGroups.map(headerGroup => {
                          const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
                   return (
                    <tr  key={key} {...restHeaderGroupProps} className="border-b border-gray-200">
                        {headerGroup.headers.map(column => {
                             const { key, ...restColumn } = column.getHeaderProps();
                            return(

                            <th key={key}  {...restColumn} className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {column.render('Header')}
                                <span>
                                    {column.isSorted
                                        ? column.isSortedDesc
                                            ? ' 🔽'
                                            : ' 🔼'
                                        : ''}
                                </span>
                            </th>
                            )
                        }
                        )}
                    </tr>
                   ) 
                }
                    
                )}
                </thead>
            <tbody  {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    const { key, ...restRowProps } = row.getRowProps();
                    return (
                        <tr key={key}  {...restRowProps} onClick={() => onRowClick(row.original)}>
                            {row.cells.map(cell => {
                                const { key, ...restCellProps } = cell.getCellProps();
                                return (
                                <td  key={key} {...restCellProps} className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                                    {cell.render('Cell')}
                                </td>
                                )
                            }
                )}
                        </tr>
                    );
                })}
            </tbody>
            </table>
    </div>
    )
}

export default Table;