import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { TodosStoreProvider } from "@/providers/todos-store-provider";

const defaultUrl = "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "LifeManager",
  description: "The app to manage your life",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="bg-background text-foreground">
        <TodosStoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="min-h-screen flex flex-col items-center">
              <Navbar />
              {children}
            </main>
          </ThemeProvider>
        </TodosStoreProvider>
      </body>
    </html>
  );
}
