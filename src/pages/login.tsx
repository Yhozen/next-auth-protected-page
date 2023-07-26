import {
  FALLBACK_REDIRECT_URL,
  useRedirectLoginRoute,
} from "@/hooks/use-redirect-login-route";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const LoginPage = () => {
  const session = useSession();
  const router = useRouter();
  // important, this will redirect to the "from" page
  useRedirectLoginRoute();
  const onClick = async () => {
    const signIngResult = await signIn("credentials", {
      username: "",
      password: "",
    });

    if (!signIngResult) return;

    const { error, ok } = signIngResult;

    console.log({ error });
    if (error) throw new Error(error);

    if (ok) return router.push(FALLBACK_REDIRECT_URL);
  };
  console.log({ session });
  return (
    <>
      <button onClick={onClick}>Sign in</button>
      <p>login</p>
    </>
  );
};

export default LoginPage;
