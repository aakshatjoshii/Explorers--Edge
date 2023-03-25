const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground')

mongoose.connect('mongodb://127.0.0.1:27017/travel-planner')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
 
const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) +10;
        const camp = new Campground({
            author: '641a1a2adce67af9b2185d7b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi expedita reiciendis commodi quia ut eum optio architecto, labore magni! Unde fugit officiis ex. At, sit suscipit! Quasi tempore ab placeat.',
            price,
            images:[
                {
                    url: 'https://res.cloudinary.com/dcrgrsnyr/image/upload/v1679514897/SmartTravel/cli20jwgajpgomvelecq.jpg',
                    filename: 'SmartTravel/cli20jwgajpgomvelecq',
                  },
                  {
                    url: 'https://res.cloudinary.com/dcrgrsnyr/image/upload/v1679514900/SmartTravel/uvj7vmramejmtpavbqwf.jpg',
                    filename: 'SmartTravel/uvj7vmramejmtpavbqwf',
                  }
                 
            ]

        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})
