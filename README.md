# 🍬 [Sweet Store Frontend](https://sweet-shop-iota.vercel.app/)
This is the **frontend** of the Sweet Store application, built using **React + Vite + Tailwind CSS**.  
It provides the user interface for browsing sweets, managing stock (for admins), and handling authentication.  

---

# 📢 Note to Incubyte Team

I wanted to provide some context regarding my submission.

Due to an unexpected medical emergency in my family (a close member suffered a rib fracture and required hospital visits and care), I was only left with two days to work on this assessment. Because of the time constraints, I made the following decisions:

- I chose to keep the frontend and backend repositories separate. This ensures cleaner code organization, no commit interference, and easier maintainability.
- For the frontend, I had to rely heavily on AI tools (primarily Claude SONET 4) to accelerate the development process within the limited time. I carefully reviewed all AI-generated code before integrating it.
- While I successfully implemented all required frontend functionality, I was not able to include **FRONTEND TEST CASES** due to time limitations.
- On the backend, I followed a TDD approach with Jest and Supertest, so the backend is well-covered with tests.

I hope this clarifies my approach and the trade-offs I made given the situation. Thank you for understanding.

Sincerely,
Mohammad

---

## Table of Contents

1. [Project Overview](#project-overview)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Setup & Run](#setup--run)  
6. [Screenshots](#screenshots)  
7. [My AI Usage](#my-ai-usage)  
8. [Testing](#testing)  

---

## Project Overview [SWEET SHOP](https://sweet-shop-iota.vercel.app)
This is the frontend of the Sweet Shop application, built using **React + Vite + Tailwind CSS**.  
It provides the user interface for browsing sweets, managing stock (for admins), and handling authentication.  

- Users can **register** and **login**.  
- Authenticated users can **view** and **search sweets**.  
- Users can **purchase sweets**.  
- Admins can **add, update, restock, and delete sweets**.  
- Token-based **JWT authentication** secures endpoints.  

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

## Tech Stack

- **Framework:** React with for fast development and builds
- **Styling:** Tailwind CSS for responsive, utility-first design
- **Routing:** for responsive, utility-first design
- **State & Context:** React Context API for authentication and role management
- **Notifications:** React Hot Toast for toast messages
- **Deployment:** Vercel for hosting the frontend

---

## Setup & Run

### 1. Clone the repository
```bash
git clone https://github.com/Mohammad10100/sweet-shop-frontend.git
cd https://github.com/Mohammad10100/sweet-shop-frontend
npm install
```
### 3. Configure environment variables
Create a .env file in the frontend/ directory:
Add the backend api baseurl in .env file 
The name should start with VITE...

*** You will get this backend url after setting up the backend from: ***
Sweet Shop Backend [README.md](https://github.com/Mohammad10100/sweet-shop)

eg
```bash
VITE_API_URL=http://localhost:3000/api
```
 

### 4. Run the development server
```bash
npm run dev
```

---

### Screenshots
## [Visit the live website](https://sweet-shop-iota.vercel.app)

<img width="2553" height="1380" alt="Landing Page" src="https://github.com/user-attachments/assets/b0fab97c-923c-49d8-b122-9f613f0b83af" />
<img width="2554" height="1379" alt="Features" src="https://github.com/user-attachments/assets/ded5f45e-6327-40a6-ad94-01afa7923721" />
<img width="2552" height="925" alt="Testimonials" src="https://github.com/user-attachments/assets/4f2e3bd1-2e7b-4b9d-97fb-849c7002dbe5" />
<img width="2552" height="896" alt="Footer" src="https://github.com/user-attachments/assets/2ca79755-8e59-4f8e-a575-f4b7e7fa9f02" />
<img width="2550" height="1382" alt="Form" src="https://github.com/user-attachments/assets/07981820-16b8-4e41-82f3-1eaaf6ab6485" />
<img width="2560" height="1382" alt="Dashboard" src="https://github.com/user-attachments/assets/2236e574-b3c3-468e-8a9a-163095aa9a7b" />
<img width="2559" height="1242" alt="Admin Panel" src="https://github.com/user-attachments/assets/ca57ee35-3c75-40b2-8caf-7b86b1988865" />

---


### My AI Usage

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


### 🧪 Testing
⚠️ Note: Due to strict time constraints (personal emergency), I could not implement frontend test cases.
However, the backend tests are available and validated (see [/backend/README.md](https://github.com/Mohammad10100/sweet-shop?tab=readme-ov-file#sweet-shop))