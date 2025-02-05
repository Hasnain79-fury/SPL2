// utils/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  // Authentication
  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  // Search
  async search(query: string) {
    const response = await fetch(`${API_BASE_URL}/search?q=${query}`);
    return response.json();
  },

  // Dashboard
  async getUserDashboardData() {
    const response = await fetch(`${API_BASE_URL}/dashboard`, {
      credentials: 'include',
    });
    return response.json();
  },

  // Admin
  async getAdminStats() {
    const response = await fetch(`${API_BASE_URL}/admin/stats`, {
      credentials: 'include',
    });
    return response.json();
  },

  // Forum
  async getForumTopics() {
    const response = await fetch(`${API_BASE_URL}/forum/topics`);
    return response.json();
  },

  async getForumCategories() {
    const response = await fetch(`${API_BASE_URL}/forum/categories`);
    return response.json();
  },

  // Ratings
  async submitRating(itemId: string, itemType: string, rating: number) {
    const response = await fetch(`${API_BASE_URL}/ratings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ itemId, itemType, rating }),
    });
    return response.json();
  },

  // Favorites
  async toggleFavorite(itemId: string, itemType: string) {
    const response = await fetch(`${API_BASE_URL}/favorites/toggle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ itemId, itemType }),
    });
    return response.json();
  },
};
