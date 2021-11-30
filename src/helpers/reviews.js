import axiosInstance from "./axios";
import { toast } from "react-toastify";

export const getReview = (setReview, setLoading, id) => {
    axiosInstance
        .get(`reviews/get-review/${id}/`)
        .then(res => {
            console.log(res.data);
            setReview(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err.response);
            toast.error("Something went wrong");
        })
}