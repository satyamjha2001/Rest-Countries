import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Error from "./components/Error";
import CountryDetail from "./components/CountryDetail";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <Error />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/contact",
//         element: <Contact />,
//       },
//       {
//         path: "/:country",
//         element: <CountryDetail />,
//       },
//     ],
//   },
// ]);

const root = createRoot(document.querySelector("#root"));
// root.render(<RouterProvider router={router} />);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/:country" element={<CountryDetail />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  </BrowserRouter>
)