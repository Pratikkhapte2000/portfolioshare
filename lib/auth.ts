import { api } from './api'

export interface User {
  userId: number
  username: string
  email: string
}

export interface AuthResponse {
  token: string
  type: string
  userId: number
  username: string
  email: string
}

export class AuthService {
  static async login(username: string, password: string): Promise<User> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', {
        username,
        password,
      })
      
      const { token, userId, username: userUsername, email } = response.data
      localStorage.setItem('token', token)
      
      return { userId, username: userUsername, email }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed')
    }
  }

  static async register(username: string, email: string, password: string): Promise<User> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', {
        username,
        email,
        password,
      })
      
      const { token, userId, username: userUsername, email: userEmail } = response.data
      localStorage.setItem('token', token)
      
      return { userId, username: userUsername, email: userEmail }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed')
    }
  }

  static async getCurrentUser(): Promise<User> {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No token found')
      }

      // Decode JWT token to get user info (simplified)
      const payload = JSON.parse(atob(token.split('.')[1]))
      return {
        userId: payload.userId,
        username: payload.sub,
        email: payload.email || '',
      }
    } catch (error) {
      throw new Error('Invalid token')
    }
  }

  static logout(): void {
    localStorage.removeItem('token')
  }
}
