"use strict";
"use server";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPost = createPost;

var _navigation = require("next/navigation");
var _posts = require("../lib/posts");
const { uploadImage } = require("@/app/lib/cloudinary");

async function createPost(prevState, formData) {
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");
  const errors = [];

  // Validation checks
  if (!title || title.trim().length === 0) {
    errors.push("title is required.");
  }

  if (!content || content.trim().length === 0) {
    errors.push("content is required.");
  }

  if (!image || image.size === 0) {
    errors.push("image is required.");
  }

  // If there are validation errors, return them
  if (errors.length > 0) {
    return { errors: errors };
  }

  try {
    // Upload the image and get the URL
    const imageUrl = await uploadImage(image);  // Await the image upload

    // Store the post with the image URL
    await (0, _posts.storePost)({
      imageUrl: imageUrl,  // Pass the actual image URL here
      title: title,
      content: content,
      userId: 1,  // Assuming userId is 1 for now
    });

    // Redirect to feed after success
    (0, _navigation.redirect)('/feed');
    
  } catch (error) {
    // Handle any errors from the upload or storePost function
    throw new Error('Image upload failed. Post was not created. Please try again later.');
  }
}
