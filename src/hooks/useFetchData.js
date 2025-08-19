import React, {useState, useEffect} from "react";
import { instanceForJSON } from "../api/instance";
import { toast } from "react-toastify";

function useFetchData(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        await instanceForJSON(url)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                setError(error);
                toast.error(error?.response?.data?.message || 'Error!');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, [url]);

    return { data, loading, error, fetchData };
}

export default useFetchData;