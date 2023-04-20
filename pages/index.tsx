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
          backgroundImage: "url(/bgBanner.svg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
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
            width: { xs: "100%", md: "85%" },
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: { xs: "block", sm: "none" },
              position: "absolute",
              right: { xs: "auto" },
              top: { xs: -420 },
              width: { xs: "800px" },
              height: { xs: "600px" },
            }}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
              }}
              alt="Pizza Logo"
              src={pizza}
            />
          </Box>

          <Typography
            variant="h1"
            sx={{
              textAlign: "center",
              color: "primary.main",
              fontFamily: bungeeInline.style.fontFamily,
              fontSize: { xs: "4rem", md: "6rem" },
              mb: 5,
            }}
          >
            Express pizzaria
          </Typography>
          <Typography
            sx={{
              margin: "60px 0 40px 0",
              fontSize: { xs: "2.5rem", lg: "4rem" },
            }}
            variant="h3"
          >
            Venha conhecer nossa pizzaria
          </Typography>
          <Button
            onClick={() => router.push("/pizzas")}
            variant="contained"
            sx={{
              fontWeight: "bold",
              padding: { xs: "10px 80px", md: "15px 100px" },
              fontSize: "25px",
              zIndex: 2,
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
        <Box
          sx={{
            display: { xs: "none", sm: "block" },
            position: "absolute",
            right: { sm: -350, md: -600, lg: -650 },
            bottom: { sm: -250, md: -600, lg: -650 },
            width: { sm: "700px", md: "1200px", lg: "1400px" },
            height: { sm: "500px", md: "1000px", lg: "1200px" },
          }}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
            }}
            alt="Pizza Logo"
            src={pizza}
          />
        </Box>
      </Box>
    </>
  );
}
