import { MouseEvent, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
// import Image from "next/image";
import pizzariaLogo from "../images/pizzariaLogo.png";
import Image from "next/image";
import { useRouter } from "next/router";
// import useStyles from "../../styles";

const pages = [{ page: "Home", endPoint: '/' }, { page: "Menu", endPoint: '/pizzas' }];
const settings = ["Meus Pedidos", "Configurações", "Sair"];

function Header() {
  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(
    null
  );

  // const classes = useStyles();

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          {/* <Typography
            // logo tela grande
            variant="h5"
            component="h1"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Pizzaria
          </Typography> */}

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Image src={pizzariaLogo} alt='Pizzaria logo' style={{ width: '100px', height: '100px' }} />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <Image src={pizzariaLogo} alt='Pizzaria logo' style={{ width: '80px', height: '80px' }} />
          </Box>

          {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              //box menu hambuger tela pequena
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}

          {/* <Typography
            // logo tela pequena
            variant="h5"
            component="h1"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Pizzaria
          </Typography> */}

          {/* <Box sx={{ display: { xs: "flex", md: "none", flexGrow: 1 } }}>
            <Image src={pizzariaLogo} alt='Pizzaria logo' style={{ width: '100px', height: '100px' }} />
          </Box> */}

          <Box sx={{ flexGrow: 1, display: "flex" }}>
            {pages.map(({ page, endPoint }) => (
              <Button
                // box home e menu tela grande
                key={page}
                onClick={() => router.push(endPoint)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Abrir configurações">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
