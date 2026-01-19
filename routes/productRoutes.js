const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
    try {
        const keyword = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i'
            }
        } : {};

        const products = await Product.find({ ...keyword });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });
        // Note: Logic allows finding by custom 'id' field if we migrated data that way, 
        // but normally we use _id. I'll support both for now or just standard _id.
        // Let's stick to Mongoose _id but if the frontend sends integer IDs, we need to handle that.
        // For this migration, we'll try to use _id but let's check if we can query by _id.
        // If the ID passed is Object ID format:
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            const productById = await Product.findById(req.params.id);
            if (productById) return res.json(productById);
        }

        // Fallback for legacy integer IDs if we seeded them as a field (optional)
        // For now, let's assume we will use _id in frontend.

        res.status(404).json({ message: 'Product not found' });
    } catch (error) {
        res.status(404).json({ message: 'Product not found' });
    }
});

// @desc    Seed products
// @route   GET /api/products/seed
// @access  Public (should be protected in prod)
router.post('/seed', async (req, res) => {
    try {
        await Product.deleteMany();

        const products = [
            {
                name: "Wireless Headphones", price: 129.99, image: "product1.avif",
                description: "Premium noise-cancelling wireless headphones with 30-hour battery life and immersive sound.",
                specs: ["Bluetooth 5.0", "30h battery", "Noise cancellation"],
                thumbnails: ["product1.avif", "product1.avif", "product1.avif"]
            },
            {
                name: "Smart Watch Elite", price: 249.99, image: "product2.avif",
                description: "Advanced fitness tracker with ECG, heart rate monitoring and GPS. Water resistant up to 50m.",
                specs: ["ECG Monitor", "GPS", "Water resistant 50m"],
                thumbnails: ["product2.avif", "product2.avif", "product2.avif"]
            },
            {
                name: "Pro Bluetooth Speaker", price: 79.99, image: "product6.avif",
                description: "Portable Bluetooth speaker with 360° sound, deep bass and IPX7 waterproof rating.",
                specs: ["IPX7 Waterproof", "12h battery", "360° sound"],
                thumbnails: ["product6.avif", "product6.avif", "product6.avif"]
            },
            {
                name: "Urban Laptop Backpack", price: 59.99, image: "product7.avif",
                description: "Stylish and durable laptop backpack with anti-theft pocket and USB charging port.",
                specs: ["Water resistant", "USB charging port", "Anti-theft"],
                thumbnails: ["product7.avif", "product7.avif", "product7.avif"]
            },
            {
                name: "4K Action Camera", price: 199.99, image: "product3.avif",
                description: "Capture your adventures in stunning 4K. Waterproof, shockproof, and ready for action.",
                specs: ["4K Video", "Waterproof", "WiFi"],
                thumbnails: ["product3.avif", "product3.avif", "product3.avif"]
            },
            {
                name: "Gaming Mouse RGB", price: 49.99, image: "product4.avif",
                description: "High-precision gaming mouse with customizable RGB lighting and programmable buttons.",
                specs: ["16000 DPI", "RGB Lighting", "Programmable Buttons"],
                thumbnails: ["product4.avif", "product4.avif", "product4.avif"]
            },
            {
                name: "Mechanical Keyboard", price: 119.99, image: "product5.avif",
                description: "Tactile mechanical keyboard for typing enthusiasts and gamers. Durable aluminum frame.",
                specs: ["Blue Switches", "RGB Backlight", "Aluminum Frame"],
                thumbnails: ["product5.avif", "product5.avif", "product5.avif"]
            },
            {
                name: "Wireless Charger Pad", price: 29.99, image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?auto=format&fit=crop&w=800&q=80",
                description: "Fast wireless charging pad for all Qi-enabled devices. Sleek and compact design.",
                specs: ["15W Fast Charge", "Qi Compatible", "LED Indicator"],
                thumbnails: ["https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?auto=format&fit=crop&w=200&q=80", "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&w=200&q=80", "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?auto=format&fit=crop&w=200&q=80"]
            },
            {
                name: "Noise Cancelling Earbuds", price: 89.99, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
                description: "True wireless earbuds with active noise cancellation and crystal clear call quality.",
                specs: ["ANC", "IPX4 Water Resistant", "24h Battery"],
                thumbnails: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=200&q=80", "https://images.unsplash.com/photo-1572569028738-411a549d0306?auto=format&fit=crop&w=200&q=80", "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=200&q=80"]
            },
            {
                name: "Smart Home Hub", price: 149.99, image: "https://images.unsplash.com/photo-1558002038-1091ae57ae43?auto=format&fit=crop&w=800&q=80",
                description: "Control your entire smart home from one device. Voice activated and compatible with all major brands.",
                specs: ["Voice Control", "Zigbee", "WiFi 6"],
                thumbnails: ["https://images.unsplash.com/photo-1558002038-1091ae57ae43?auto=format&fit=crop&w=200&q=80", "https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=200&q=80", "https://images.unsplash.com/photo-1558002038-1091ae57ae43?auto=format&fit=crop&w=200&q=80"]
            },
            {
                name: "Ultra-Wide Monitor", price: 499.99, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
                description: "34-inch curved ultra-wide monitor for immersive gaming and productivity.",
                specs: ["34 inch", "144Hz", "1ms Response"],
                thumbnails: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=200&q=80", "https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&w=200&q=80", "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=200&q=80"]
            },
            {
                name: "Ergonomic Office Chair", price: 299.99, image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=800&q=80",
                description: "Premium mesh ergonomic chair with adjustable lumbar support and headrest.",
                specs: ["Mesh Back", "Adjustable Lumbar", "Reclining"],
                thumbnails: ["https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=200&q=80", "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=200&q=80", "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=200&q=80"]
            }
        ];

        const createdProducts = await Product.insertMany(products);
        res.json(createdProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
