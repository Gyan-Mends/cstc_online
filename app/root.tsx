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


export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];



export default function App() {
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
          <Outlet />
          <ScrollRestoration />
          <Scripts />
        </NextThemesProvider>
        <LiveReload />
      </body>
    </html>
  );
}
