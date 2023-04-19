import { Box, Button, Typography } from "@mui/material";
import { Bungee_Inline } from "@next/font/google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import pizza from "../public/pizza.png";

export const bungeeInline = Bungee_Inline({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Box
        sx={{
          background:
            "radial-gradient(circle, rgba(48,48,48,1) 0%, rgba(0,0,0,1) 100%)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100vw",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "85%",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: "primary.main",
              fontFamily: bungeeInline.style.fontFamily,
              fontSize: "6rem",
              mb: 5
            }}
          >
            Express pizzaria
          </Typography>
          <Typography sx={{ margin: "60px 0 40px 0" }} variant="h3">
            Venha conhecer nossa pizzaria
          </Typography>
          <Button
            onClick={() => router.push("/pizzas")}
            variant="contained"
            sx={{
              // width: "200px",
              fontWeight: "bold",
              padding: "15px 100px",
              fontSize: "25px"
            }}
          >
            Ir para o site
          </Button>
        </Box>
        <Box
          sx={{
            padding: "10px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              gap: "5px",
            }}
          >
            <GitHubIcon fontSize="medium" />
            <Typography
              href="https://github.com/Pedro-28"
              target="_blank"
              component="a"
              variant="h5"
              sx={{
                color: "primary.main",
                textDecoration: "none",
                "&:hover": { color: "#B28E23" },
              }}
            >
              github.com/Pedro-28
            </Typography>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              gap: "5px",
            }}
          >
            <GitHubIcon fontSize="medium" />
            <Typography
              href="https://github.com/MatheusNF123"
              target="_blank"
              component="a"
              variant="h5"
              sx={{
                color: "primary.main",
                textDecoration: "none",
                "&:hover": { color: "#B28E23" },
              }}
            >
              github.com/MatheusNF123
            </Typography>
          </Box>
        </Box>
        <Image
          style={{
            position: "absolute",
            right: -650,
            bottom: -700,
          }}
          alt="Pizza Logo"
          src={pizza}
          width="1400"
          height="1200"
        />

      </Box>
    </>
  );
}
