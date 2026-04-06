import RootLayout from "@/common/layouts/root-layout";
import AuthContent from "./auth-content";

const AuthPage = () => {

  return (
    <RootLayout
      pageTitle="Auth"
      shouldShowNavbar={false}
      shouldShowSidebar={false}
    >
      <main className="flex min-h-screen items-center justify-center p-6">
        <AuthContent className="w-full max-w-md" />
      </main>
    </RootLayout>
  );
};

export default AuthPage;
