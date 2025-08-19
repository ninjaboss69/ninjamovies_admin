const Expand = ({ hiddenColumns, data }) => {
    return (
        <div>{hiddenColumns.map((col) => {
            const key = col.accessorKey;

            const value =
                key && data ? data[key] : "";
            return (
                <div key={key} className="bg-white h-16 flex flex-1 gap-2 py-1">
                    <div className="ml-2 border customized-rounded w-full basis-1/3 flex items-center justify-center">
                        <h3 className="text-center  font-bold text-[#231F2080]">{col.header || col.Header}:</h3>{" "}
                    </div>
                    <div className="mr-2 border customized-rounded w-full basis-2/3 flex items-center justify-center text-smallHeader">
                        <div className="w-full pl-2 text-left break-all ">
                            <div className="flex items-center gap-2  font-semibold  text-[#231F20E6] ">
                                {key === "order_date"
                                    ? new Date(value).toLocaleDateString("en-GB", {
                                        year: "numeric",
                                        month: "short",
                                        day: "2-digit",
                                    })
                                    : String(value)}
                            </div>
                        </div>
                    </div>
                </div>
            );
        })}</div>
    )
}

export default Expand