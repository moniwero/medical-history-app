# 📌 Medical History App

### My first React project! 🚀

A web application for managing medical test results in specific categories. It allows users to add, view, and delete results along with associated images.

## 📖 Project Description

The application was built using **React.js** and **Vite**, ensuring fast performance and easy development environment configuration. **Supabase** was used for backend handling.

## 🛠 Technologies

- **React.js** – Frontend of the application
- **Vite** – Fast development environment
- **React Router** – Navigation between pages
- **Material UI (MUI)** – UI components
- **Supabase** – Database and image storage
- **SCSS** – Application styling

## ⚙️ System Requirements

To run the project locally, the following are required:

- **Node.js** (v16+)
- **NPM** lub **Yarn**

## 📂 Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/moniwero/medical-history-app.git
   cd medical-history-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root directory and add:

   ```env
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Run the application:**

   ```bash
   npm run dev
   ```

## 🎯 Features

- 📌 **View results** – Users can view results for a selected category.
- ➕ **Add results** – Ability to add a result along with an image.
- ❌ **Delete results** – Option to delete results along with their images.
- ✏️ **Edit results** – Users can edit the description of an existing result.
- 🔍 **Image preview** – Zoom and view images in a modal.

## 📌 Project Structure

```
📂 src
├── 📂 assets       # images
├── 📂 components   # UI components
├── 📂 pages        # Page views
├── 📂 services     # Supabase configuration, user and result functions
├── 📂 styles       # SCSS files
├── main.jsx         # Application entry point
├── router.jsx       # Routing logic
```

## 📝 Code Comments

The code is annotated with comments, especially in key areas such as modal handling, result deletion, and Supabase configuration.

## 📬 Contact

Have questions or suggestions? Get in touch:
📧 **Email:** mmonisiabb@gmail.com  
🐙 **GitHub Issues:** [Report an issue](https://github.com/moniwero/medical-history-app/issues)

---

Thank you for your interest in my project! 😊
