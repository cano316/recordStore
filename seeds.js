const mongoose = require('mongoose');

main().catch(e => console.log(e))
async function main() {
    await mongoose.connect('mongodb://localhost:27017/recordStore');
    console.log('Connected to MongoDB from seeds.js')
}

const Product = require('./models/products');

const seedArr = [
    {
        title: 'My Beautiful Dark Twisted Fantasy',
        artist: 'Kanye West',
        price: 35,
        format: 'LP',
        genre: 'hip hop'
    },
    {
        title: 'Wathching Movies With The Sound Off',
        artist: 'Mac Miller',
        price: 20,
        format: 'CD',
        genre: 'hip hop'
    },
    {
        title: 'Dark Side of the Moon',
        artist: 'Pinl Floyd',
        price: 100,
        format: 'Reel-To-Reel',
        genre: 'rock'
    },
    {
        title: 'Marshall Mathers LP',
        artist: 'Eminem',
        price: 20,
        format: 'Cassette',
        genre: 'rock'
    },
    {
        title: 'Ride the Lightning',
        artist: 'Metallica',
        price: 35,
        format: 'LP',
        genre: 'rock'
    },
    {
        title: 'Donuts',
        artist: 'J. Dilla',
        price: 20,
        format: 'CD',
        genre: 'hip hop'
    },
    {
        title: 'Kids See Ghosts',
        artist: 'Kids See Ghosts',
        price: 35,
        format: 'LP',
        genre: 'hip hop'
    },
];

Product.insertMany(seedArr)
    .then(res => console.log(res))
    .catch(e => console.log(e))