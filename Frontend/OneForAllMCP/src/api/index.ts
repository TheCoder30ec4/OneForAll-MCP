const API_URL = 'http://127.0.0.2:8001';

export const post = async (endpoint: string, body: any) => {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `API Error on ${endpoint}`);
  }

  return response.json();
};
