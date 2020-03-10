export default {
  serverPort: 3000,
  appName: "Expense Tracker",
  languages: {
    default: "es",
    list: ["es", "en"],
  },
  security: {
    secretKey: process.env.SECRET_KEY,
    expiresIn: process.env.EXPIRES_IN,
  },
}
