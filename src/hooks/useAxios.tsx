import { useState, useEffect } from "react";
import { AxiosRequestConfig } from "axios";

import { axiosInstance } from "../utils/AxiosInterceptor";

interface IRequest {
    url: string;
    method: string;
    body: null;
    headers: null;
}

const useAxios = ({ url, method, body = null, headers = null }: IRequest) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        const config: AxiosRequestConfig = {
            method: method,
            url: url,
            data: body ? JSON.parse(body) : undefined,
            headers: headers ? { ...JSON.parse(headers) } : undefined,
        };
        axiosInstance(config)
            .then((res) => {
                setResponse(res.data);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, [method, url, body, headers]);

    return { response, error, loading };
};

export default useAxios;
