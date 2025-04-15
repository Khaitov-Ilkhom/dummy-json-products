// import axios from "axios";
//
// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
//
// export default axiosInstance;

import axios from "axios";
import {toast} from "sonner";

const axiosInstance = axios.create({baseURL: import.meta.env.VITE_BASE_URL});

axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => {
      const res = error.response;

      if (res?.data?.errors && Array.isArray(res.data.errors)) {
        res.data.errors.forEach((err: any) => {
          toast.error(err?.errorMsg || "Noma'lum xatolik");
        });
      } else if (res?.data?.message) {
        toast.error(res.data.message);
      } else if (res?.data?.error) {
        toast.error(res.data.error);
      } else {
        toast.error("Server bilan bog‘lanishda xatolik yuz berdi");
      }

      return Promise.reject(error);
    }
);

export default axiosInstance;
