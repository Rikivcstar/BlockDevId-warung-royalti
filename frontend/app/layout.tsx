import "./globals.css";
import { StacksProvider } from "@/context/StacksContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StacksProvider>{children}</StacksProvider>
      </body>
    </html>
  );
}
