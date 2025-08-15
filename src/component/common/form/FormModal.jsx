import { AnimatePresence, motion } from "framer-motion";

const FormModal = ({ isOpen, onClose, header, children }) => {
    const handleSave = () => {

        const form = document.querySelector("form");
        if (form) form.requestSubmit();
    };
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 max-h-screen "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-[50%] h-[80%]  max-h-[80%]   "
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between ">

                            <h2 className="text-xl text-center font-semibold mb-4">{header}</h2>

                            <span className="text-sm font-bold cursor-pointer border border-slate-600 px-2 py-1 rounded-md hover:bg-gray-300 transition" onClick={onClose}>X</span>
                        </div>

                        <div className="border border-slate-600 rounded-2xl p-6 overflow-y-auto  h-[80%]">
                            {children}

                        </div>
                        {/* button */}
                        <div className="p-6  w-full px-4 flex flex-col sm:flex-row sm:justify-center sm:gap-8 gap-3">
                            <button
                                onClick={onClose}
                                className="w-full sm:w-36 bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-xl shadow-md hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type='submit'
                                onClick={handleSave}
                                className="w-full sm:w-36 bg-blue-600 text-white font-medium py-2 px-4 rounded-xl shadow-md hover:bg-blue-700 transition"
                            >
                                Save
                            </button>
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FormModal;
