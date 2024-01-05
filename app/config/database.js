const mongoose = require('mongoose')

const DBConnect = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://methjaya252:VJh6SYmym3wIbIfn@cluster0.zjgxoen.mongodb.net/?retryWrites=true&w=majority');

    console.log(`MongoDB Connected: ${conn.connection.host}`)
    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = DBConnect;