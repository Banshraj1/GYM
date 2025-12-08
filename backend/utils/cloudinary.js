import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
const uploadImage = async (imagePath) => {
    if(!imagePath){
        throw new Error("Image path is required");
    }
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };
  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result;
  } catch (error) {
    console.error(error);
  }
};
export default uploadImage;
