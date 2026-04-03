# MegaBlog

MegaBlog is a React-based blog platform mini project that demonstrates a full content workflow: authentication, creating posts, editing posts, viewing post details, and deleting posts. It uses **Appwrite** as the backend for user accounts, database storage, and image uploads.

## What This Project Does

This app allows users to:

- sign up and log in
- create blog posts with a title, slug, content, status, and featured image
- edit existing posts
- view individual post pages
- browse all published posts
- delete posts they authored

The app also checks the current session on load so authenticated users stay signed in when possible.

## How It Is Designed

The project is structured around a simple blog layout with protected routes and reusable UI pieces:

- `Header` changes navigation links based on login state
- `Footer` keeps the layout consistent across pages
- `AuthLayout` protects routes that require authentication
- `PostForm` is reused for both create and edit flows
- `PostCard` is used to display blog previews
- `RTE` provides rich text editing for post content

The UI is styled with Tailwind CSS classes and uses a clean, modern blog look. The homepage focuses on post discovery, while the post page gives authors direct access to edit or delete their own content.

## Tech Stack

- `React 19`
- `Redux Toolkit`
- `React Redux`
- `React Router DOM`
- `React Hook Form`
- `Appwrite`
- `TinyMCE`
- `html-react-parser`
- `Vite`
- `Tailwind CSS`
- `JavaScript`

## Backend Features

Appwrite is used for:

- authentication and session management
- database documents for blog posts
- file storage for featured images
- post creation, update, delete, and fetch operations

## Folder Structure

```bash
10MegaBlog/
|-- src/
|   |-- appwrite/
|   |-- components/
|   |-- conf/
|   |-- pages/
|   |-- store/
|   |-- App.jsx
|   |-- App.css
|   |-- index.css
|   `-- main.jsx
```

## Main Pages

- `/` - homepage showing recent or available posts
- `/login` - login form
- `/signup` - user registration form
- `/all-posts` - authenticated posts dashboard
- `/add-post` - create a new blog post
- `/edit-post/:slug` - edit an existing post
- `/post/:slug` - view a full blog post

## How It Works

1. The app starts and checks whether a user session already exists.
2. Navigation changes depending on whether the user is logged in.
3. Authenticated users can create posts using the rich text editor and image upload.
4. Post slugs are generated from the title to create clean URLs.
5. Posts are stored in Appwrite and displayed on the home and post detail pages.
6. Authors can update or delete only their own posts.

## Environment Variables

Create a `.env` file with your Appwrite values:

```bash
VITE_APPWRITE_URL=your-appwrite-endpoint
VITE_APPWRITE_PROJECT_ID=your-project-id
VITE_APPWRITE_DATABASE_ID=your-database-id
VITE_APPWRITE_TABLE_ID=your-collection-id
VITE_APPWRITE_BUCKET_ID=your-bucket-id
```

## How to Use

1. Install dependencies:

```bash
npm install
```

2. Add your Appwrite credentials to `.env`.

3. Start the development server:

```bash
npm run dev
```

4. Open the app in your browser and start creating blog posts.

## What I Learned

This project is a good exercise for learning:

- protected routing in React Router
- Appwrite authentication and data services
- file upload and preview handling
- reusable form components
- state management with Redux Toolkit
- rich text content rendering

## Notes

- Posts are tied to the logged-in user.
- Featured images are stored in Appwrite Storage.
- The app is designed as a portfolio-ready blog platform demo.
