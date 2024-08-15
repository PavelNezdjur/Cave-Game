import axios from 'axios';

const BASE_URL = 'https://cave-drone-server.shtoa.xyz';

export async function initGame(name, complexity) {
  try {
    const response = await axios.post(`${BASE_URL}/init`, { name, complexity });
    return response.data.id;
  } catch (error) {
    console.error('Error initializing game:', error);
  }
}

export async function getTokenChunk(id, chunkNo) {
  try {
    const response = await axios.get(`${BASE_URL}/token/${chunkNo}`, {
      params: { id },
    });
    return response.data.chunk;
  } catch (error) {
    console.error(`Error getting token parts (chunkNo: ${chunkNo}):`, error);
  }
}

export async function getFullToken(id) {
  const chunks = await Promise.all(
    [1, 2, 3, 4].map((n) => getTokenChunk(id, n))
  );
  return chunks.join('');
}
