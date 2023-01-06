import { ReactNode } from "react";
import Head from "next/head";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";

import Header from "../../src/components/header";

type LayoutProps = {
  title: string;
  children: ReactNode;
};

export default function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          // minHeight: "100vh",
          // height: "100%",
          backgroundColor: "#212121",
          // width: "100%",
        }}
      >
        <Header />
        {/* <main
          className="HHHHHHH"
          style={{
            height: "100%",
            minHeight: "100%",
            // width: "100%",
          }}
        > */}
          {children}
        {/* </main> */}
      </div>
    </>
  );
}

// backgroundColor: theme.palette.background.dark,
// display: 'flex',
// height: '100vh',
// overflow: 'hidden',
// width: '100vw',

// wrapper: {
//   display: 'flex',
//   flex: '1 1 auto',
//   overflow: 'hidden',
//   paddingTop: 64,
//   [theme.breakpoints.up('lg')]: {
//     paddingLeft: 256,
//   },

// contentContainer: {
//   display: 'flex',
//   flex: '1 1 auto',
//   overflow: 'hidden',
// },

// content: {
//   flex: '1 1 auto',
//   height: '100%',
//   overflow: 'auto',
// },
