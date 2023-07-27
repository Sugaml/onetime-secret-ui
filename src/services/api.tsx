// api.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Define the ApiResponse interface
interface ApiResponse {
  url: string;
}

// axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

let baseURL = ''; // Initialize with a default value

if (typeof process !== 'undefined' && process.env.API_BASE_URL) {
  baseURL = process.env.API_BASE_URL;
  console.log("baseurl ::",baseURL)
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  // Other Axios configuration options
});

export default axiosInstance;

export const generateSecretUrl = async (
  content: string,
  paraphrase: string,
  days: number
): Promise<string> => {
  try {
    if (content.trim() === '') {
      throw new Error('Content field cannot be empty.');
    }

    const response: AxiosResponse<ApiResponse> = await axiosInstance.post<ApiResponse>(
      '/one-time-secret',
      {
        content,
        paraphrase,
        days,
      }
    );

    return response.data.url;
  } catch (error) {
    console.error('Error fetching the URL:', error);
    throw error;
  }
};
