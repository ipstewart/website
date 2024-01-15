import axios, { AxiosResponse } from 'axios';

const apiKey: string | undefined = import.meta.env.VITE_MERRIAM_WEBSTER_API_KEY;
const apiUrl: string | undefined = import.meta.env.VITE_MERRIAM_WEBSTER_API_URL;

export const fetchDefinitions = async (
  word: string,
): Promise<(string | { def: string })[] | null> => {
  try {
    const response: AxiosResponse<string[]> = await axios.get(`${apiUrl}${word}?key=${apiKey}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching definition:', error);
    return null;
  }
};
