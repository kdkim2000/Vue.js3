import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 환경 변수에서 API URL 설정
  timeout: 5000, // 요청 제한 시간
});

export default api;