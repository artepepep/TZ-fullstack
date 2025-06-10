# GitHub Search Application

A full-stack single page application that allows users to search for GitHub **Users** or **Repositories**, with backend caching and responsive UI.

---

## 🚀 Tech Stack

- **Frontend:** React.js, TypeScript, Redux, Redux-Persist, Tailwind CSS
- **Backend:** Django REST Framework (DRF), Redis (for caching)
- **Other:** Axios, Lodash (for debounce), GitHub API

---

## 🎯 Features

### 🔍 Search Functionality
- Real-time search with debounce (300ms).
- Two input fields: one for search query, one dropdown to choose between **Users** and **Repositories**.
- Search is triggered only after typing **3 or more characters**.
- Results are displayed in a responsive grid (3 columns on desktop, 2 on tablet, 1 on mobile).
- Changing the search type refreshes the results.
- Results are **cached in Redis for 2 hours**.

### 👤 User Cards
- Avatar, username, ID, link to GitHub profile.

### 📦 Repository Cards
- Repo name, author, stars, and link to the repository.

### ⚙️ API Endpoints
- `POST /api/search/`: Search GitHub (users or repositories), returns and caches results.
- `POST /api/clear-cache/`: Clears Redis cache (for development/debugging).

### 💾 Caching
- Redis used for backend response caching.
- Prevents duplicate API calls for the same queries.

### ✅ Extra
- All UI states handled: loading, empty, error.
- Backend unit tests.
- Easily extendable (e.g., add GitHub issues, pagination, etc.)

### 🔁 Pagination
This project uses **cursor-based pagination**, which is a modern and efficient alternative to traditional offset-based pagination.

It integrates naturally with GitHub’s API and offers several advantages:
- ✅ Better performance for large datasets
- ✅ More consistent results when data changes between requests
- ✅ Ideal for infinite scroll UX

On the frontend, infinite scroll is implemented using `IntersectionObserver`, fetching more results as the user reaches the bottom of the list.

---

## 🧠 Design Decisions

- **Redis for caching:** ensures fast repeated responses and offloads GitHub API usage.
- **Debounce:** reduces unnecessary API traffic and improves performance.
- **Responsive Grid:** user-friendly across all devices.
- **Redux + Persist:** manages global state (search text/type) and preserves across sessions.
- **Modular Code Structure:** components and hooks are organized for readability and maintainability.

---

## 📦 Setup Instructions

### Backend (Django)

```bash
# Create virtual environment
python -m venv env
source env/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run Redis server (ensure Redis is installed)
redis-server

# Run backend
python manage.py runserver
