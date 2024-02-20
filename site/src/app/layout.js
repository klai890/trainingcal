import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Training Cal",  
  description: "Log your endurance training" 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
	  <link
  rel="icon"
  href="/icon.png"
  type="image/png"
  sizes="32x32"
/>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
