const mongoose = require("mongoose");

const dbUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rdwf6.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

class DbClient {
  connection = {};

  curentConnect = {};

  constructor() {
    this.dbConnect();
  }

  dbConnect = async () => {
    try {
      if (this.connection.isConnected) {
        console.log("already connected");
        return;
      }

      if (mongoose.connections) {
        if (mongoose.connections.lenght > 0) {
          this.connection.isConnected = mongoose.connections[0].readyState;
          this.curentConnect = mongoose.connection;
          if (this.connection.isConnected === 1) {
            return;
          }
          await mongoose.disconnect();
        }
      }

      // mongoose.connect();
      const db = await mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      if (db.connections) {
        this.connection.isConnected = db.connections[0]
          ? db.connections[0].readyState
          : false;

        this.curentConnect = mongoose.connection;
      }
      // console.log("mongoose.connection, ", mongoose.connection);
    } catch (error) {
      console.log("DB Connection Error ", error);
    }
  };

  disconnect = async () => {
    if (this.connection.isConnected) {
      if (process.env.NODE_ENV === "production") {
        await mongoose.disconnect();
        this.connection.isConnected = false;
        this.curentConnect = undefined;
      } else {
        console.log("not disconnected");
      }
    }
  };

  convertDocToObj = (doc) => {
    if (doc) {
      doc._id = doc._id.toString();
      doc.createdAt = doc.createdAt?.toString();
      doc.updatedAt = doc.createdAt?.toString();
    }
    return doc;
  };

  getConnect = () => {
    return this.curentConnect;
  };
}

const dbClient = new DbClient();

module.exports = dbClient;
