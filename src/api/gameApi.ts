import axios from 'axios';
import { Game } from '../types/game';

const API_URL = 'http://localhost:3001/games';

export const fetchGames = async (): Promise<Game[]> => {
  const response = await axios.get<Game[]>(API_URL);
  return response.data;
};

export const createGame = async (game: Partial<Game>): Promise<Game> => {
  const response = await axios.post<Game>(API_URL, game);
  return response.data;
};

export const updateGame = async (id: string, game: Partial<Game>): Promise<Game> => {
  const response = await axios.put<Game>(`${API_URL}/${id}`, game);
  return response.data;
};

export const deleteGame = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
