import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "AT Live Stream", description: "Live channels" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      
      {/* Ads form Adsterra */}
      <script data-cfasync="false" src="https://aarems.org/1/b088e1747022e48ecd4d62bcfb3024be"></script>

      <body>{children}</body> 
    </html>
  );
}