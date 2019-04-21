module.exports = {
  development: {
    dialect: 'sqlite',
    url: 'sqlite:../database.sqlite3'
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
}
