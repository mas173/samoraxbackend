const cloudinary = require("../lib/cloudnary")



const uploadToCloudinary = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(); 
    }

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "samorax/menu",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

  
    res.locals.image = {
      url: result.secure_url,
      public_id: result.public_id,
    };

    next();
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    res.status(500).json({ message: "Image upload failed" });
  }
};

module.exports = uploadToCloudinary;
