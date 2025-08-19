
const Pagination = ({ page, setPage, limit, setLimit, totalItems }) => {
    const totalPages = Math.ceil(totalItems / limit);

    const handlePrev = () => {
        setPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="flex justify-between items-center mt-4 px-2">
            <div className="flex gap-2 items-center">
                <button
                    onClick={handlePrev}
                    className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
                    disabled={page === 1}
                >
                    Prev
                </button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={handleNext}
                    className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
            <div>
                <select
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="border p-1 rounded ml-2 border-blue-500 outline-none"
                >
                    {[5, 10, 20].map((size) => (
                        <option key={size} value={size}>
                            Show {size}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Pagination