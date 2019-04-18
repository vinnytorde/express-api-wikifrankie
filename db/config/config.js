module.exports = {
  development: {
    url:
      process.env.DATABASE_URL ||
      'postgres://cqrqickrgguxjr:2896a71ba7c0c3ee8e80e6aac6d4f822d32d82321af28b6bdbf332f42ff26a19@ec2-54-225-113-7.compute-1.amazonaws.com:5432/ddk8ulpkaar683',
    dialect: 'postgres',
    dialectOptions: {
      ssl: { require: true }
    }
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
}
