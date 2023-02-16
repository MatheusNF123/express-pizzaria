import { GetServerSideProps } from "next";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";

import { getRequest } from "../../src/services/api";
import { User } from "../../src/Types";
import Layout from "../../src/components/layout";

type AdminUsersProps = {
  users: User[] | null;
};

export default function AdminUsers({ users }: AdminUsersProps) {
  return (
    <Layout title="Admin: usuários">
      <Box
        sx={{
          minHeight: "calc(100vh - 100px)",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "20px",
        }}
      ></Box>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { data, status } = await getRequest<User[]>("pizzas");

    if (status !== 200)
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };

    return {
      props: { users: data },
    };
  } catch (error) {
    return {
      props: { users: null },
    };
  }
};
