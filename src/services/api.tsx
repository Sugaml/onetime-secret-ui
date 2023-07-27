import axios from "axios";

interface ApiResponse {
  url: string;
}

export const generateSecretUrl = async (content: string,paraphase: string,days: number): Promise<string> => {
  try {
    if (content.trim() === "") {
      throw new Error("Content field cannot be empty.");
    }

    const response = await axios.post<ApiResponse>("/api/generate-url", {
      content,
      paraphase,
      days
    });

    return response.data.url;
  } catch (error) {
    console.error("Error fetching the URL:", error);
    throw error;
  }
};
