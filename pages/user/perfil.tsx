import { Container } from "@mui/material";
import { GetServerSideProps } from "next";

import PerfilForm from "../../src/components/perfilForm";
import getUser from "../../src/services/getUser";
import Layout from "../../src/components/layout";
import { User } from "../../src/Types";

type ProfileProps = {
  user: User;
};

export default function Profile({ user }: ProfileProps) {
  return (
    <Layout title="perfil">
      <Container
        maxWidth="xl"
        sx={{
          alignItems: "center",
          minHeight: "calc(100vh - 87px)",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          justifyContent: "center",
        }}
      >
        <PerfilForm user={user} />
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { data } = await getUser(ctx);

    if (!data)
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };

    return {
      props: { user: data },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
};
