import Head from 'next/head'
import Image from 'next/image'
import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router';

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>404 - Página não encontrada</title>
      </Head>
      <Box sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
        width: "100vw",
      }}>
        <Box
          component="a"
          href="https://storyset.com/web"
          target="_blank"
          sx={{
            width: { xs: "350px", sm: "500px", md: "700px" },
            height: { xs: "300px", sm: "400px", md: "500px" },
            overflow: "hidden",
            position: "relative"
          }}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
              margin: 0,
              padding: 0
            }}
            layout="fill"
            objectFit='contain'
            src="/notFound.svg"
            alt="Página não encontrada"
          />
        </Box>
        <Typography
          sx={{
            color: "white",
            textAlign: "center",
            fontSize: { xs: "3rem", md: "5.5rem" },
            fontWeight: "bold",
          }}
          component={"h1"}
          variant={"h1"}
        >
          Ops! Página não encontrada
        </Typography>
        <Button
          sx={{
            fontWeight: "bold",
            mt: 4,
            mb: 8
          }}
          onClick={() => router.push("/")}
          variant="contained"
        >
          Voltar para a página inicial
        </Button>
      </Box>
    </>
  )
}
