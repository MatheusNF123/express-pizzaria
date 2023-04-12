import { Box, Button, Container } from "@mui/material";
import Image from "next/image";
// import Image from "next/image";

// import pizzaBanner from "../src/images/pizzaBanner.png";
import Header from "../src/components/header";
import Layout from "../src/components/layout";
// import pizzariaBanner from "../src/images/pizzariaBanner.png";

export default function Home() {

  return (
    <Layout title="Home">
      <Box
        // maxWidth="xl"
        sx={{
          minHeight: "calc(100vh - 100px)",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          // padding: "20px",
        }}
      >
        <Box sx={{
          // backgroundColor: "white",
          backgroundImage: `url(/pizzariaBanner.png)`,
          backgroundRepeat: 'no-repeat',
          // objectFit: "scale-down",
          // backgroundSize: "fill",
          width: "100%",
          // height: "calc(100vh - 70px)",
          backgroundSize: "100% 100%",
          backgroundPosition: "center center",
        }}></Box>
        {/* <Image style={{ width: "100%", height: "100vh" }} src={pizzariaBanner} alt="Banner da pizzaria" /> */}
      </Box>
    </Layout>
    // <>
    //   <Head>
    //     <title>Home</title>
    //   </Head>
    //   <main>
    //     <Header />
    //     <Box
    //       sx={{            
    //         display: "flex",
    //         width: "100%",
    //         height: "100vh",
    //       }}
    //     >
    //       <Button
    //         sx={{
    //           color: "white",
    //           borderColor: "white",
    //           display: "flex",
    //           alignSelf: "end",
    //         }}
    //         variant="outlined"
    //       >
    //         <Link href={'/pizzas'}>Menu</Link>
    //       </Button>
    //     </Box>
    //   </main>
    // </>
  );
}
