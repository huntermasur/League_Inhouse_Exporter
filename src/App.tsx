import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./shared/components/layout";
import { GamesPage } from "./pages/games-page";
import { StatsPage } from "./pages/stats-page";
import { SettingsPage } from "./pages/settings-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <GamesPage /> },
      { path: "stats", element: <StatsPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
