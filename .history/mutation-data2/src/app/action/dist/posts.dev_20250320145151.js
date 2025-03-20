"use strict";
"use server";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPost = createPost;

var _navigation = require("next/navigation");

var _posts = require("../lib/posts");
const { uploadImage } = require("@/app/lib/cloudinary");

function createPost(prevState, formData) {
  var title, image, content, errors;
  return regeneratorRuntime.async(function createPost$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          title = formData.get("title");
          image = formData.get("image");
          content = formData.get("content");
          errors = [];

          if (!title || title.trim().length === 0) {
            errors.push("title is required.");
          }

          if (!content || content.trim().length === 0) {
            errors.push("content is required.");
          }

          if (!image || image.size === 0) {
            errors.push("image is required.");
          }

          if (!(errors.length > 0)) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", {
            errors: errors
          });
        const imageUrl =  uploadImage(image);

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap((0, _posts.storePost)({
            imageUrl: '',
            title: title,
            content: content,
            userId: 1
          }));

        case 11:
          (0, _navigation.redirect)('/feed');

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
}