import { AuthClient } from '@lf-network/auth-sdk-js'

const client = new AuthClient({
  baseUrl: 'http://localhost:8080/v1',
})

export default client
