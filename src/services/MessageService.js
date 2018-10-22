import axios from 'axios'

const API_URL = 'http://dry-fjord-64564.herokuapp.com/api/v1'

class MessageService {
  static async getAll() {
    return (await axios.get(`${API_URL}/messages/`)).data
  }

  static async create(content, author, image = null) {
    return (await axios.post(`${API_URL}/messages/`, {
      content, author, image,
    })).data
  }
}

export default MessageService
