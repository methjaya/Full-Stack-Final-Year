const mongoose = require('mongoose')

const DBConnect = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://methjaya252:VJh6SYmym3wIbIfn@cluster0.zjgxoen.mongodb.net/gymdb?retryWrites=true&w=majority');

    // const conn = await mongoose.connect('mongodb://localhost:27017/gymdb');

    console.log(`MongoDB Connected: ${conn.connection.host}`)
    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = DBConnect;