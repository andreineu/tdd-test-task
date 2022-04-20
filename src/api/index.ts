import { User } from "../types"

const BASE_URL = "https://jsonplaceholder.typicode.com/"

class Api {
  private readonly baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async getUsers() {
    const response = await fetch(this.baseUrl + 'users')
    const users: User[] = await response.json()
    return users
  }

  async getUserById(id: string) {
    const response = await fetch(this.baseUrl + 'users/' + id)
    const user: User = await response.json()
    return user
  }
}

export const api = new Api(BASE_URL)