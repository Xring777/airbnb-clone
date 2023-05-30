import NavBar from "./components/navbar/NavBar";
import "./globals.css";
import { Nunito } from "next/font/google";
import ClientOnly from "@/app/components/clientonly/ClientOnly";
import RegisterModal from "@/app/components/modals/RegisterModal";
import ToastProvider from "@/app/providers/ToastProvider";
import LoginModal from "@/app/components/modals/LoginModal";
import getCurrentUser from "@/app/actions/getCurrentUser";
import RentModal from "@/app/components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
          <ToastProvider />
          <RentModal />
          <RegisterModal />
          <LoginModal />
          <SearchModal/>
          <NavBar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
