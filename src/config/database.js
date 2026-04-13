const mongoose = require('mongoose');
const sequelize = require('./postgres');

const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    // Connect to PostgreSQL with Sequelize
    await sequelize.authenticate();
    console.log('PostgreSQL connected');

    // Sync models
    await sequelize.sync();
    console.log('Database synced');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;