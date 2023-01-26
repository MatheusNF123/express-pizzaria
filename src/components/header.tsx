import { MouseEvent, useContext, useState } from "react";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Badge,
} from "@mui/material";

import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

import pizzariaLogo from "../images/pizzariaLogo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { userContext } from "../context/userProvider";

const pages = [
  { page: "Home", endPoint: "/" },
  { page: "Menu", endPoint: "/pizzas" },
];
const settings = [
  { page: "Meus Pedidos", endPoint: "/user/meus_pedidos" },
  { page: "Configurações", endPoint: "/pizzas" },
  { page: "Sair", endPoint: "/pizzas" },
];

function Header() {
  const { cartQuantity } = useContext(userContext);
  const router = useRouter();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserMenuClick = (endPoint: string) => {
    router.push(endPoint)
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Image
            src={pizzariaLogo}
            alt="Pizzaria logo"
            style={{ width: "80px", height: "80px" }}
          />


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

          <Badge badgeContent={cartQuantity} sx={{ marginRight: "10px" }}>
            <Tooltip title="Abrir carrinho">
              <IconButton
                aria-label="Carrinho"
                onClick={() => router.push("/user/carrinho")}
              >
                <ShoppingCartRoundedIcon
                  fontSize="large"
                  sx={{ color: "white" }}
                />
              </IconButton>
            </Tooltip>
          </Badge>

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
              {settings.map(({ page, endPoint }) => (
                <MenuItem key={page} onClick={() => handleUserMenuClick(endPoint)}>
                  <Typography textAlign="center">{page}</Typography>
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
