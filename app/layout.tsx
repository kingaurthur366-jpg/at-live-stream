import Script from 'next/script';
import "./globals.css";
import type {Metadata} from "next";
export const metadata:Metadata={title:"AT Live Stream",description:"Live channels"};
export default function Layout({children}:
    {children:React.ReactNode}){return <html lang="en"><body>{children}
    
    <div
  dangerouslySetInnerHTML={{
    __html: `<!-- BEGIN AADS AD UNIT 2456915 -->

<div id="frame" style="width: 100%;margin: auto;position: relative; z-index: 99998;">
          <iframe data-aa='2456915' src='//acceptable.a-ads.com/2456915/?size=Adaptive'
                            style='border:0; padding:0; width:70%; height:auto; overflow:hidden;display: block;margin: auto'></iframe>
        </div>

<!-- END AADS AD UNIT 2456915 -->
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Aapki baki website ka content/pages */}
        {children}

        {/* --- AADS Ad Code (Sabhi Pages Ke Niche Dikhne Ke Liye) --- */}
        <div id="frame" style={{ width: '100%', margin: 'auto', position: 'relative', zIndex: 99998 }}>
          <iframe
            data-aa="2456915"
            src="//acceptable.a-ads.com/2456915/?size=Adaptive"
            style={{ border: 0, padding: 0, width: '70%', height: 'auto', overflow: 'hidden', display: 'block', margin: 'auto' }}
          />
        </div>
      </body>
    </html>
  );
}`
  }}
/>

    </body>
    </html>}