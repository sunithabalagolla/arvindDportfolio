// backend/utils/seedProducts.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected for seeding');

    // Delete existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

   const products = [
  {
    name: "Unisex BJP T-shirt Orange",
    description: "Premium quality unisex BJP t-shirt made from 100% cotton. Perfect for showing your support and commitment to our values.",
    price: 499,
    originalPrice: 624,
    category: "apparel",
    type: "orange-tshirt",
    image: "https://via.placeholder.com/400x500/FF6600/FFFFFF?text=Orange+T-Shirt", // ✅ Temporary placeholder
    discount: 20,
    rating: 4.5,
    reviews: 128,
    badge: "Best Seller",
    inStock: true,
    quantity: 50,
    specifications: {
      size: "S, M, L, XL, XXL",
      color: "Orange",
      material: "100% Cotton",
      weight: "150g"
    }
  },
  {
    name: "BJP Logo Coffee Mug",
    description: "Stylish ceramic coffee mug featuring the BJP logo. Perfect for your morning coffee while staying connected to our mission.",
    price: 499,
    originalPrice: 599,
    category: "accessories",
    type: "mug",
    image: "https://via.placeholder.com/400x500/FFFFFF/FF6600?text=Coffee+Mug", // ✅ Temporary placeholder
    discount: 15,
    rating: 4.8,
    reviews: 95,
    badge: "Top Rated",
    inStock: true,
    quantity: 75,
    specifications: {
      size: "350ml",
      color: "White with Orange Design",
      material: "Ceramic",
      weight: "300g"
    }
  },
  {
    name: "BJP Flags Set of 10",
    description: "High-quality fabric flags set. Perfect for rallies, events, or displaying at home. Set includes 10 flags with sturdy poles.",
    price: 499,
    originalPrice: 599,
    category: "flags",
    type: "flags",
    image: "https://via.placeholder.com/400x500/FF6600/FFFFFF?text=Flag+Set", // ✅ Temporary placeholder
    discount: 10,
    rating: 4.6,
    reviews: 142,
    badge: "Popular",
    inStock: true,
    quantity: 30,
    specifications: {
      size: "30cm x 45cm",
      color: "Orange and White",
      material: "Polyester Fabric",
      quantity: "10 flags with poles"
    }
  },
  {
    name: "Unisex BJP T-shirt White",
    description: "Classic white BJP t-shirt with orange logo. Made from breathable cotton for all-day comfort.",
    price: 499,
    originalPrice: 624,
    category: "apparel",
    type: "white-tshirt",
    image: "https://via.placeholder.com/400x500/FFFFFF/FF6600?text=White+T-Shirt", // ✅ Temporary placeholder
    discount: 25,
    rating: 4.7,
    reviews: 110,
    badge: "Best Value",
    inStock: true,
    quantity: 60,
    specifications: {
      size: "S, M, L, XL, XXL",
      color: "White",
      material: "100% Cotton",
      weight: "150g"
    }
  },
  {
    name: "BJP Cap Premium Edition",
    description: "Premium adjustable cap with embroidered BJP logo. Perfect for outdoor events and daily wear.",
    price: 349,
    originalPrice: 499,
    category: "accessories",
    type: "cap",
    image: "https://via.placeholder.com/400x500/FF6600/FFFFFF?text=Premium+Cap", // ✅ Temporary placeholder
    discount: 30,
    rating: 4.4,
    reviews: 87,
    badge: "New",
    inStock: true,
    quantity: 45,
    specifications: {
      size: "One Size Fits All",
      color: "Orange and White",
      material: "Cotton Twill",
      closure: "Adjustable Strap"
    }
  },
  {
    name: "BJP Wristband Pack",
    description: "Set of 5 colorful wristbands with BJP branding. Great for unity and showing solidarity.",
    price: 299,
    originalPrice: 399,
    category: "accessories",
    type: "wristband",
    image: "https://via.placeholder.com/400x500/0066CC/FFFFFF?text=Wristband+Pack", // ✅ Temporary placeholder
    discount: 25,
    rating: 4.3,
    reviews: 64,
    badge: "Limited",
    inStock: true,
    quantity: 100,
    specifications: {
      size: "One Size Fits All",
      color: "Orange, White, Blue Mix",
      material: "Silicone",
      quantity: "Pack of 5"
    }
  },
  {
    name: "Premium BJP T-shirt Combo",
    description: "Exclusive combo set featuring 2 premium t-shirts - one orange and one white. Best value for dedicated supporters.",
    price: 899,
    originalPrice: 1299,
    category: "apparel",
    type: "combo",
    image: "https://via.placeholder.com/400x500/FF9933/FFFFFF?text=T-Shirt+Combo", // ✅ Temporary placeholder
    discount: 30,
    rating: 4.9,
    reviews: 203,
    badge: "Exclusive",
    inStock: true,
    quantity: 25,
    specifications: {
      size: "S, M, L, XL, XXL",
      color: "Orange & White",
      material: "100% Premium Cotton",
      quantity: "2 T-shirts"
    }
  },
  {
    name: "BJP Merchandise Bundle",
    description: "Complete merchandise bundle including t-shirt, cap, mug, and wristband. Perfect starter pack for new supporters.",
    price: 1299,
    originalPrice: 1799,
    category: "flags",
    type: "bundle",
    image: "https://via.placeholder.com/400x500/FF6600/FFFFFF?text=Merch+Bundle", // ✅ Temporary placeholder
    discount: 28,
    rating: 4.5,
    reviews: 156,
    badge: "Bundle",
    inStock: true,
    quantity: 15,
    specifications: {
      contents: "1 T-shirt, 1 Cap, 1 Mug, 1 Wristband",
      color: "Mixed",
      material: "Cotton, Ceramic, Silicone"
    }
  }
];

    const createdProducts = await Product.insertMany(products);
    console.log(`✅ ${createdProducts.length} products seeded successfully!`);

    createdProducts.forEach((product, index) => {
      console.log(`  ${index + 1}. ${product.name} - ₹${product.price}`);
    });

    mongoose.connection.close();
    console.log('✅ Database connection closed');
    console.log('\n🎉 Seeding complete! Your products are ready to use.');

  } catch (error) {
    console.error('❌ Seeding error:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};

// Run seeding
seedProducts();