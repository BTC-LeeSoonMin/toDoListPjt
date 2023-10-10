import axios from "axios";
import { loginedAdminState } from '../atom/LoginSession'
import { useRecoilState } from "recoil";


const GetRecoilValue = () => {
    const [accessToken, setAccessToken] = useRecoilState(loginedAdminState);
    return accessToken;
}

// url 호출 시 기본 값 셋팅
const api = axios.create({
//   baseURL: "https://api.themoviedb.org/3",
  headers: { "Content-type": "application/json" }, // data type
});

api.interceptors.request.use(
    function (config) {
        console.log("config1 : ", config);
        const refreshToken = localStorage.getItem("refreshToken");
        const accessToken = GetRecoilValue();
        console.log("refreshToken1 : ", refreshToken);
        console.log("accessToken1 : ", accessToken);

        //요청시 AccessToken 계속 보내주기
        if (!accessToken) {
            console.log("!accessToken");
            config.headers.accessToken = null;
            config.headers.refreshToken = null;
            return config;
        }

        if (config.headers && accessToken) {
            console.log("config.headers && accessToken");
            config.headers.authorization = `Bearer ${accessToken}`;
            config.headers.refreshToken = `Bearer ${refreshToken}`;
            return config;
        }
        // Do something before request is sent
        console.log("request start", config);
    },
    function (error) {
        // Do something with request error
        console.log("request error", error);
        return Promise.reject(error);
    }
);

// Add a response interceptor
// api.interceptors.response.use(
//     function (response) {
//         // Any status code that lie within the range of 2xx cause this function to trigger
//         // Do something with response data
//         console.log("get response", response);
//         return response;
//     },
//     async (error) => {
//         const {
//             config,
//             response: { status },
//         } = error;
//         if (status === 401) {
//             if (error.response.data.message === "expired") {
//                 const originalRequest = config;
//                 const refreshToken = await localStorage.getItem("refreshToken");
//                 // token refresh 요청
//                 const { data } = await axios.post(
//                     `/api/member/refreshToken`, // token refresh api
//                     {},
//                     { headers: { authorization: `Bearer ${refreshToken}` } }
//                 );
//                 // 새로운 토큰 저장
//                 console.log("만료 후 재발급받은 토큰 : ", data.data.accessToken);
//                 // setLoginSession(data.data.accessToken);
//                 const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data;
//                 await localStorage.multiSet([
//                     ["accessToken", newAccessToken],
//                     ["refreshToken", newRefreshToken],
//                 ]);
//                 originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
//                 // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
//                 return axios(originalRequest);
//             }
//         }
//         // Any status codes that falls outside the range of 2xx cause this function to trigger
//         // Do something with response error
//         console.log("response error", error);
//         return Promise.reject(error);
//     }
// )

export default api;