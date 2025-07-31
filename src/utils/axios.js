import axios from "axios";

//인스턴스 생성
const instance = axios.create({
  baseURL: "", //'/api' 제거
  timeout: 5000
});

//요청 인터셉터: 토큰 자동 삽입
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//응당 인터셉터: 공통 에러 처리
instance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      alert("로그인 정보가 만료되었습니다.");
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      location.href = "/login";
    } else if (err.response?.data?.message) {
      alert(err.response.data.message);
    } else {
      alert("알 수 없는 오류가 발생했습니다.");
    }
    return Promise.reject(err);
  }
);

export default instance;
