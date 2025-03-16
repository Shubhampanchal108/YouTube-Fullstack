# YouTube Full-Stack Clone (MERN)

This is a full-featured YouTube clone built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It replicates almost all key functionalities of YouTube, including video uploads, streaming, comments, likes, subscriptions, and more.

## Features

✅ User Authentication (JWT-based)
✅ Video Uploading & Processing
✅ Video Streaming (HLS / MP4)
✅ Like, Dislike, and Comment System
✅ Subscriptions & Notifications
✅ Search & Filtering
✅ Watch History & Recommendations
✅ User Profile & Customization
✅ Dark/Light Mode Toggle
✅ Admin Panel for Content Moderation

## Tech Stack

### Frontend:

- React.js (with Hooks & Context API)
- Redux Toolkit (for state management)
- Tailwind CSS (for styling)
- React Router (for navigation)
- Axios (for API requests)

### Backend:

- Node.js & Express.js (REST API)
- MongoDB & Mongoose (Database)
- Firebase Storage / AWS S3 (Video storage)
- Cloudinary (Image processing)
- JWT Authentication
- Multer (File uploads)

## Installation & Setup

### 1️⃣ Clone the Repository

```sh
https://github.com/Shubhampanchal108/YouTube-Fullstack.git
cd YouTube-Fullstack
```

### 2️⃣ Install Dependencies

#### Backend:

```sh
cd server
npm install
```

#### Frontend:

```sh
cd client
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the backend directory and add:

```env
PORT = ""
MONGODB_URL = ""

CLOUD_NAME = ""
"CLOUDINARY_API_KEY = ""
CLOUDINARY_SECRET = ""

CLOUDINARY_URL = ""
"JWT_SECRET = ""
```

### 4️⃣ Run the Application

#### Backend:

```sh
cd server
npm start
```

#### Frontend:

```sh
cd client
npm start
```

### 5️⃣ Access the Application

- Open `http://localhost:3000` in your browser.
- The backend runs on `http://localhost:5000`.

## Screenshots



## Future Enhancements

- Live Streaming Feature
- AI-Based Video Recommendations
- More Analytics & Insights

## Contributions

Feel free to contribute! Fork the repository, create a new branch, and submit a pull request.

## License

This project is licensed under the MIT License.

---

**Author:** Shubham 🚀

