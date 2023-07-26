import { authOptions } from "@/pages/api/auth/[...nextauth]";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { Session } from "next-auth";

import { getServerSession } from "next-auth/next";

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export async function getServerAuthSession(ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  return session;
}

const AUTH_PATH = "/login";

export const getAuthedServerSideProps =
  <ServerProps extends Record<string, any>>(
    getServerSideProps: (
      context: GetServerSidePropsContext,
      session: Session
    ) => Promise<GetServerSidePropsResult<ServerProps>>
  ) =>
  async (context: GetServerSidePropsContext) => {
    const fromURL = context.resolvedUrl;
    const session = await getServerAuthSession({
      req: context.req,
      res: context.res,
    });

    if (!session || !session.user)
      return {
        redirect: {
          destination: `${AUTH_PATH}?from=${fromURL}`,
          permanent: false,
        },
      };

    return getServerSideProps(context, session);
  };
