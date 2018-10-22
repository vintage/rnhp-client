import { AsyncStorage } from 'react-native'

class AuthorService {
  static nameKey = 'author_name';

  static async setName(name: string) {
    return AsyncStorage.setItem(this.nameKey, name)
  }

  static async getName() {
    return AsyncStorage.getItem(this.nameKey)
  }
}

export default AuthorService
