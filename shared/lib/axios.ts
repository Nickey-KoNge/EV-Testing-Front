// src/shared/lib/axios.ts

import axios, { AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
});

api.interceptors.response.use((response: AxiosResponse) => response.data);
