const api = {
  api:
    process.env.ENV !== 'production'
      ? 'http://localhost:3000'
      : 'https://prod.com/api',
}

// Example

export default api
