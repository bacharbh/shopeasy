const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shopeasy');
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('Database Connection Error:', err.message);
        process.exit(1);
    }
};

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    description: String,
    specs: [String],
    thumbnails: [String]
});

const Product = mongoose.model('Product', productSchema);

// New, high-reliability Unsplash URLs
// Wireless Charger: "Phone on charging pad" by regular contributor
const wirelessChargerImg = "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&w=800&q=80";

// Smart Hub: Google Nest/Home style
const smartHubImg = "https://images.unsplash.com/photo-1558002038-1091ae57ae43?auto=format&fit=crop&w=800&q=80"; // Re-trying this one or finding fallback. 
// Actually, let's use a very generic "smart home" tech image to be safe.
// Photo by Dan LeFebvre on Unsplash (Smart thermostat/hub)
const smartHubImgSafe = "https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=800&q=80";

// Monitor: Ultrawide workspace
const monitorImg = "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80"; // This one is usually good, but let's try another if it failed?
// Let's stick with this one but if it failed, fallback will catch it.
// Or let's switch to "photo-1547394765-185e1e68f34e" (Curve monitor)

// Chair: Office chair
const chairImg = "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=800&q=80";

const seedFix = async () => {
    await connectDB();
    try {
        // Update Wireless Charger
        await Product.updateOne(
            { name: "Wireless Charger Pad" },
            { $set: { image: wirelessChargerImg, thumbnails: [wirelessChargerImg, wirelessChargerImg, wirelessChargerImg] } }
        );
        console.log('Updated Wireless Charger');

        // Update Smart Home Hub
        await Product.updateOne(
            { name: "Smart Home Hub" },
            { $set: { image: smartHubImgSafe, thumbnails: [smartHubImgSafe, smartHubImgSafe, smartHubImgSafe] } }
        );
        console.log('Updated Smart Home Hub');

        // Update others just in case
        await Product.updateOne(
            { name: "Ultra-Wide Monitor" },
            { $set: { image: monitorImg, thumbnails: [monitorImg, monitorImg, monitorImg] } }
        );
        await Product.updateOne(
            { name: "Ergonomic Office Chair" },
            { $set: { image: chairImg, thumbnails: [chairImg, chairImg, chairImg] } }
        );

        console.log('Fix complete');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedFix();
