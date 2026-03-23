const cloudinary =require('cloudinary').v2
const uploadToCloudinary = (buffer, publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
        .upload_stream(
            {
              resource_type: "auto",
              public_id: publicId,
              folder: "presidency",
              quality: 90,
              fetch_format: "auto",
            },
            (err, result) => {
              if (err) return reject(err);
              resolve(result.secure_url);
            },
        )
        .end(buffer);
  });
};
const uploadToCloudinaryForProofs = (buffer, publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
        .upload_stream(
            {
              resource_type: "auto",
              public_id: publicId,
              folder: "proofsForAcademics",
              quality: 90,
              fetch_format: "auto",
            },
            (err, result) => {
              if (err) return reject(err);
              resolve(result.secure_url);
            },
        )
        .end(buffer);
  });
};
module.exports = { uploadToCloudinary, uploadToCloudinaryForProofs };

