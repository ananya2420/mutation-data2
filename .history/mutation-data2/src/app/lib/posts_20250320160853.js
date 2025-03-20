import sql from 'better-sqlite3';

const db = new sql('posts.db');

function initDb() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            first_name TEXT,
            last_name TEXT,
            email TEXT
        )
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY,
            image_url TEXT NOT NULL,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            user_id INTEGER,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    `);

    db.exec(`
        CREATE TABLE IF NOT EXISTS likes (
            user_id INTEGER,
            post_id INTEGER,
            PRIMARY KEY (user_id, post_id),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
        )
    `);

    const stmt = db.prepare('SELECT COUNT(*) as count FROM users');

    if (stmt.get().count === 0) {
        db.exec(`
            INSERT INTO users (first_name, last_name, email)
            VALUES ('John', 'Doe', 'john@example.com')
        `);

        db.exec(`
            INSERT INTO users (first_name, last_name, email)
            VALUES ('Max', 'Schwaraz', 'max@example.com')
        `);
    }
}
initDb();

export function getPosts(maxNumber) {
    let limitClause = maxNumber ? 'LIMIT ?' : '';

    const stmt = db.prepare(`
        SELECT 
            posts.id AS post_id, 
            posts.image_url AS image, 
            posts.title, 
            posts.content, 
            posts.created_at AS createdAt,
            users.first_name AS userFirstName, 
            users.last_name AS userLastName, 
            users.email,
            COUNT(likes.post_id) AS likes,
            EXISTS (
                SELECT 1 FROM likes 
                WHERE likes.post_id = posts.id 
                AND likes.user_id = 2
            ) AS isLiked
        FROM posts
        INNER JOIN users ON posts.user_id = users.id
        LEFT JOIN likes ON posts.id = likes.post_id
        GROUP BY posts.id, users.first_name, users.last_name, users.email
        ORDER BY createdAt DESC
        ${limitClause}
    `);

    return maxNumber ? stmt.all(maxNumber) : stmt.all();
}

export function storePost(post) {
    const stmt = db.prepare(`
        INSERT INTO posts (image_url, title, content, user_id)
        VALUES (?, ?, ?, ?)
    `);

    return stmt.run(post.imageUrl, post.title, post.content, post.userId);
}

export function updatePostLikeStatus(postId, userId) {
    const stmt = db.prepare(`
        SELECT COUNT(*) AS count FROM likes 
        WHERE user_id = ? AND post_id = ?
    `);

    const result = stmt.get(userId, postId);
    return result.count > 0;
}
