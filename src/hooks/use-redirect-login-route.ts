import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export const FALLBACK_REDIRECT_URL = "/protected";

export const useRedirectLoginRoute = () => {
  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    const redirectRoute = router.query.from;

    if (typeof redirectRoute === "string" && session) {
      router.replace(redirectRoute);
    } else if (session) {
      router.replace(FALLBACK_REDIRECT_URL);
    }
  }, [router, session]);
};
