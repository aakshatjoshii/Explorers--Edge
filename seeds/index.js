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
            // user id
            author: '641a1a2adce67af9b2185d7b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi expedita reiciendis commodi quia ut eum optio architecto, labore magni! Unde fugit officiis ex. At, sit suscipit! Quasi tempore ab placeat.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images:[
                {
                    url: 'https://res.cloudinary.com/dcrgrsnyr/image/upload/v1679517517/SmartTravel/gitgdti9qxekdfxtbl3m.jpg',
                    filename: 'SmartTravel/gitgdti9qxekdfxtbl3m',
                  },
                  {
                    url: 'https://res.cloudinary.com/dcrgrsnyr/image/upload/v1679517518/SmartTravel/cxhdrt22x4aypkoaaypg.jpg',
                    filename: 'SmartTravel/cxhdrt22x4aypkoaaypg',
                  }
                 
            ]

        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})
