import axiosInstance from "./axios";
import { toast } from "react-toastify";

export const getBootcamp = (setBootcamp, setLoading, id) => {
    axiosInstance
        .get(`bootcamps/get-bootcamp/${id}/`)
        .then(res => {
            console.log(res.data);
            setBootcamp(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err.response);
            toast.error("Something went wrong");
        })
}