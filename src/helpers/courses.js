import axiosInstance from "./axios";
import { toast } from "react-toastify";

export const getCourse = (setCourse, setLoading, id) => {
    axiosInstance
        .get(`courses/get-course/${id}/`)
        .then(res => {
            console.log(res.data);
            setCourse(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err.response);
            toast.error("Something went wrong");
        })
}