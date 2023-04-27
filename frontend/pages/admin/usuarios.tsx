import { useState } from "react";
import { GetServerSideProps } from "next";
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { getRequest, deleteRequest } from "../../src/services/api";
import { User } from "../../src/Types";
import Layout from "../../src/components/layout";
import setApiHeaders from "../../src/services/setApiHeaders";

import { styled } from "@mui/material/styles";

const tableHeader = ["Foto", "Nome", "Email", "Endereço", "Telefone", ""];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0000005c",
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
    color: "white",
  },
  border: 0,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#3131315c",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

type AdminUsersProps = {
  users: User[] | null;
};

export default function AdminUsers(props: AdminUsersProps) {
  const [users, setUsers] = useState<User[] | null>(props.users);

  const handleUsersReload = async () => {
    try {
      setApiHeaders();
      const { data, status } = await getRequest<User[]>("admin/user");
      if (status !== 200) {
        setUsers(null);
      }
      setUsers(data);
    } catch (error) {
      setUsers(null);
    }
  };

  const handleUserDeletion = async (id: string) => {
    setApiHeaders();
    await deleteRequest(`admin/user/${id}`);

    await handleUsersReload();
  };

  return (
    <Layout title="Admin: usuários">
      <Container maxWidth="xl">
        <Typography color="white" variant="h4" sx={{ m: 2 }}>
          Controle de Usuários
        </Typography>
        <Box
          sx={{
            minHeight: "calc(100vh - 100px)",
            width: "100%",
            pb: 10,
          }}
        >
          <TableContainer
            sx={{
              backgroundColor: "#00000034",
              borderRadius: "10px",
            }}
          >
            <Table sx={{ minWidth: 700 }} aria-label="Table de usuários">
              <TableHead>
                <TableRow>
                  {tableHeader.map((col, i) => (
                    <StyledTableCell key={i}>{col}</StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell>
                      <Avatar
                        sx={{
                          width: 50,
                          height: 50,
                          backgroundColor: "white",
                          border: "2px solid #FFCC33",
                        }}
                        title={`Imagem do ${row.name} `}
                        src={row.img}
                      />
                    </StyledTableCell>
                    <StyledTableCell> {row.name} </StyledTableCell>
                    <StyledTableCell>{row.email}</StyledTableCell>
                    <StyledTableCell>{row.address}</StyledTableCell>
                    <StyledTableCell>{row.phone}</StyledTableCell>
                    <StyledTableCell align="right">
                      <IconButton
                        aria-label="Excluir usuário"
                        onClick={() => handleUserDeletion(row.id)}
                      >
                        <DeleteIcon
                          fontSize="large"
                          sx={{ color: "white", fontSize: 30 }}
                        />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    setApiHeaders(ctx);
    const { data, status } = await getRequest<User[]>("admin/user");

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
