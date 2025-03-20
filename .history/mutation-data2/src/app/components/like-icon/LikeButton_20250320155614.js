"use client";

export default function LikeButton({ onClick, liked }) {
    return (
        <button
            onClick={onClick}
            className={`p-2 rounded ${liked ? "text-red-500" : "text-gray-500"}`}
        >
            ❤️ {liked ? "Liked" : "Like"}
        </button>
    );
}
