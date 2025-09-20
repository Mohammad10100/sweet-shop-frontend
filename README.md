# 🍬 Sweet Store Frontend

This is the **frontend** of the Sweet Store application, built using **React + Vite + Tailwind CSS**.  
It provides the user interface for browsing sweets, managing stock (for admins), and handling authentication.  

---

## 🚀 Features
- User-friendly UI to browse sweets
- Authentication and role-based access
- Admin panel to:
  - Add new sweets
  - Restock existing sweets
  - Edit/Delete sweets
- Responsive design using TailwindCSS

---


## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd https://github.com/Mohammad10100/sweet-shop-frontend
npm install
```
### 3. Configure environment variables
Create a .env file in the frontend/ directory:
*** You will get this backend url after setting up the backend from: ***
```bash
https://github.com/Mohammad10100/sweet-shop-frontend
```

eg:
```bash
VITE_API_URL=BackendUrl
```

### 4. Run the development server
```bash
npm run dev
```

### 5. Screenshots

### 6. 🤖 My AI Usage

For transparency, here’s how I used AI tools during development:
ChatGPT (OpenAI GPT-5) and Claude (Sonnet 4)

- Helped brainstorm component structures (e.g., SweetCard, SweetForm, RestockModal).
- Generating Boiler Plate Codes.
- Provided guidance on state management and modal handling.
- Assisted in writing the initial README.md template.
- Suggested better commit messages for clarity.

Reflection
Using AI sped up my workflow significantly, especially since I had only a couple of days to complete the frontend.
However, I made sure to review and edit all generated code before integrating it, ensuring I understood each part.
Without AI, I wouldn’t have been able to finish the frontend within the limited time, but I retained full control over the logic and design choices.


### 6. 🧪 Testing
⚠️ Note: Due to strict time constraints (personal emergency), I could not implement frontend test cases.
However, the backend tests are available and validated (see [/backend/README.md](https://github.com/Mohammad10100/sweet-shop?tab=readme-ov-file#sweet-shop))