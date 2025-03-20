import { v2 as cloudinary } from 'cloudinary';

// Ensure environment variables are set
if (!process.env.CLOUDINARY_CLOUD_NAME) {
    throw new Error('CLOUDINARY_CLOUD_NAME is not set');
}
if (!process.env.CLOUDINARY_CLOUD_API_KEY) {
    throw new Error('CLOUDINARY_API_KEY is not set');
}
if (!process.env.CLOUDINARY_CLOUD_API_SECRET) {
    throw new Error('CLOUDINARY_API_SECRET is not set');
}

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

// Function to upload image
export async function uploadImage(image) {
    // Convert image to Buffer (no need for base64 conversion)
    const imageBuffer = await image.arrayBuffer();
    
    const result = await cloudinary.uploader.upload(imageBuffer, {
        folder: 'nextjs-course-mutation', // Cloudinary folder name
        resource_type: 'auto', // Automatically detect image type (useful for image formats)
    });

    // Return the secure URL of the uploaded image
    return result.secure_url;  // Fixed the case issue (secure_url)
}
