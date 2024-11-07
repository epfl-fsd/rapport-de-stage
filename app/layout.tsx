import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css";
import "./print.css";

export const metadata: Metadata = {
  title: "Rapport de stage",
  description: "Outil de création de rapport de stages de l'État de Vaud.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="font-['Calibri']">{children}</body>
    </html>
  );
}
