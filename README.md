# Civic Issue Tracker

A web application that empowers citizens to report, track, and view resolutions of civic issues in their neighborhood — such as potholes, garbage collection, or faulty streetlights — with complete transparency and accountability.

---

## 🌐 Overview

Citizens often face challenges in reporting and tracking local civic issues. Complaints get lost, updates are unclear, and there’s no centralized system to ensure transparency.  
**Civic Issue Tracker** bridges this gap by providing an easy-to-use platform for citizens and authorities to communicate effectively.

---

## 🚀 Features

### 🧍 Citizen Portal
- Log complaints with **photos** and **live location** (via Google Maps API).  
- Track the **real-time status** of submitted complaints.  
- Receive **notifications** for status updates.  

### 🛠️ Admin Dashboard
- View all registered complaints in a centralized interface.  
- Update issue status (e.g., **Pending → In Progress → Resolved**).  
- Filter and sort issues by area, type, or status.  

### 🌍 Public Dashboard
- Display all **resolved complaints** for public transparency.  
- Show location and resolution details using **interactive maps**.  

---

## 💬 Bonus Features
- **Chatbot Integration** — Simple rule-based or API-powered chatbot to answer queries like  
  _“What’s the status of my complaint?”_  
- **Push/Email Notifications** — Keep users informed at every stage of issue resolution.  

---

## 🧩 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | React / Next.js (with Google Maps API) |
| **Backend** | Node.js + Express |
| **Database** | MongoDB |
| **Authentication** | JWT / OAuth |
| **Notifications** | Nodemailer |
| **Deployment** | Vercel|

---

## Live Server
-   /URL/


## Dependencies

-   mongoose
-   express
-   dotenv
-   OPENWEATHER_API
-   JWT Token - node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"