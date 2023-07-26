import { getAuthedServerSideProps } from "@/helpers/getAuthedServerSideProps";
import type { InferGetServerSidePropsType } from "next";

type ProtectedPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

const ProtectedPage = (props: ProtectedPageProps) => {
  return (
    <>
      <p>name: {props.session.user?.name}</p>
      <p>secret:{props.secret}</p>
      <pre>{JSON.stringify(props.session, null, 4)}</pre>
    </>
  );
};

export const getServerSideProps = getAuthedServerSideProps(
  async (ctx, session) => {
    return {
      props: {
        session,
        secret: "hola nico",
      },
    };
  }
);

export default ProtectedPage;
