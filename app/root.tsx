import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import stylesheet from "~/tailwind.css";
import {HeroUIProvider} from "@heroui/react";
import "aos/dist/aos.css";
import { useEffect } from "react";
import AOS from "aos";



export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];



export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      offset: 200,    // Offset from the top before triggering
      easing: "ease-in-out", // Easing for the animation
      once: true,     // Whether animation should happen only once
    });

    // Refresh AOS on dynamically loaded content
    AOS.refresh();
  }, []);

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        </head>
      <body className="h-full">
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          value={{
            light: "light",
            dark: "dark",
          }}
          className="light:bg-light-background dark:bg-dark-background"
        >
          <HeroUIProvider>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          </HeroUIProvider>
        </NextThemesProvider>
        <LiveReload />
      </body>
    </html>
  );
}
