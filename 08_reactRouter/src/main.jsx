import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import User from './components/User/User.jsx'
import Github, { githubInfoLoader } from './components/GitHub/GitHub.jsx'

/*
=====================================================
📌 PROJECT FLOW – React Router DOM (v6+ Data Router)
=====================================================

1️⃣ Application Entry Point (main.jsx)
-------------------------------------
- The application starts from main.jsx.
- ReactDOM creates the root and renders <RouterProvider>.
- createBrowserRouter() is used to define all routes.
- createRoutesFromElements() helps define routes in JSX format.

2️⃣ Route Configuration
-----------------------
- The root route ("/") uses <Layout /> as its element.
- All other routes are defined as children of this root route.
- This enables layout-based (nested) routing.

Route Structure:
/
├── Home        → "/"
├── About       → "/about"
├── Contact     → "/contact"
├── User        → "/user/:userid"   (Dynamic Route)
└── Github      → "/github"          (Data Loader Route)

3️⃣ Layout Component (Layout.jsx)
---------------------------------
- Layout contains common UI elements:
  - <Header /> → always visible
  - <Footer /> → always visible
- <Outlet /> acts as a placeholder for child routes.
- Only the content inside <Outlet /> changes on navigation,
  while Header and Footer remain constant.

4️⃣ Navigation System
---------------------
- <Link> is used for normal internal navigation.
- <NavLink> is used in Header to apply active styling.
- NavLink provides `isActive` which highlights the current route.

5️⃣ Page Rendering via Outlet
-----------------------------
- When the URL changes:
  - React Router matches the route.
  - The matched component is rendered inside <Outlet />.
Example:
  URL "/about"   → <About /> renders inside Outlet
  URL "/contact" → <Contact /> renders inside Outlet

6️⃣ Dynamic Routing (User.jsx)
------------------------------
- Route path: "/user/:userid"
- useParams() is used to extract the dynamic URL parameter.
- Example:
  URL "/user/101"
  userid = "101"
- This is commonly used for profiles, products, blogs, etc.

7️⃣ Data Fetching with Loader (GitHub.jsx)
-----------------------------------------
- githubInfoLoader() runs BEFORE the Github component renders.
- It fetches GitHub user data from the API.
- The fetched data is automatically passed to the component.
- useLoaderData() is used to access this data.
- This approach avoids useEffect and improves performance.

8️⃣ Overall Rendering Flow
--------------------------
Browser URL
   ↓
React Router
   ↓
Layout Component
   ↓
Header (static)
   ↓
Outlet (dynamic page content)
   ↓
Footer (static)

=====================================================
✅ Result:
- Clean, scalable routing structure
- Reusable layout
- Dynamic routes
- Optimized data loading
- Real-world React Router architecture
=====================================================
*/


// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout/>,
//     children: [
//       {
//         path: "",
//         element: <Home />
//       },
//       {
//         path: "about",
//         element: <About />
//       },
//       {
//         path: "contact",
//         element: <Contact />
//       }
//     ]
//   }
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='user/:userid' element={<User />} />
      <Route 
      loader={githubInfoLoader}
      path='github' 
      element={<Github />}
       />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)