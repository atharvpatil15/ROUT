const cloudinary = require('cloudinary').v2;

// These should be in your .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.getSignature = (req, res, next) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder: 'threaded_leaves_products'
    },
    process.env.CLOUDINARY_API_SECRET
  );

  res.status(200).json({
    status: 'success',
    data: {
      signature,
      timestamp,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY
    }
  });
};
