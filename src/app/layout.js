// app/layout.js
import GlobalStyle from "./GlobalStyle";

export const metadata = {
  title: "Mooni Candles",
  description: "Fill your space with quiet magic",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalStyle />
        {children}
      </body>
    </html>
  );
}