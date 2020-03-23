export default {
  baseUrl: 'http://localhost:3000',
  api: {
    uri: 'http://localhost:5000/graphql',
    credentials: 'same-origin'
  },
  debug: false,
  cache: {
    enable: true,
    whitelist: []
  },
  session: {
    cookieDomain: 'localhost',
    maxAge: 604800,
    cookiePrefix: '',
    path: '/',
    httpOnly: true
  }
};
