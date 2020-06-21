const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    preference: [ {type: String, required: true }] ,
    birthday: { type: Date, required: true },

    image: {type: String, default: 'uploads/placeholder.png'},
    number: String,
    description: String,
    location: String,
    likes: [ { type: String }],
    dislikes: [ { type: String }],
    
    img: { data: Buffer, contentType: String } // https://stackoverflow.com/questions/29780733/store-an-image-in-mongodb-using-node-js-express-and-mongoose
  },
  { timestamps: true } 
);

module.exports = mongoose.model("User", UserSchema);
