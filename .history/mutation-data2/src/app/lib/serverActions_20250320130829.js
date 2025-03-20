// lib/serverActions.js

export async function createPost(formData) {
    const errors = [];

    // Validate title
    if (!formData.get("title") || formData.get("title").trim().length === 0) {
        errors.push("Title is required.");
    }

    // Validate content
    if (!formData.get("content") || formData.get("content").trim().length === 0) {
        errors.push("Content is required.");
    }

    // Validate image
    if (!formData.get("image")) {
        errors.push("Image is required.");
    }

    // If there are validation errors, return them
    if (errors.length > 0) {
        return { errors };
    }

    // Simulate creating the post (e.g., store it in the database)
    // You would typically make a request to the server or database here.
    console.log("Post created successfully:", formData);

    return { success: true };
}
