import type { Metadata } from "next";
import { Inter} from "next/font/google";
import "./globals.css";
import UserProvider from "./Provider";

export const metadata: Metadata = {
  title: "Fwu Incubation",
  description: "Fwu Incubation center , farwestern university ,kanchanpur ,mahendranagar , kata-18 ,nepal",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={ `${inter.variable} m-0 p-0 font-sans`}
        suppressHydrationWarning
        
      >
       
          <UserProvider>
            {children}
          </UserProvider>
      </body>
    </html>
  );
}
