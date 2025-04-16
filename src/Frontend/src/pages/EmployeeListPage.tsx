import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled, tableCellClasses } from "@mui/material";
import { useEffect, useState } from "react";

interface Department {
  code: string;
  description: string;
}

interface EmployeeListQuery {
    id: number;
    firstName: string;
    lastName: string;  
    department: Department[];  
    address: string;
    email: string;
    phone: string;
  }

export default function EmployeeListPage() {
    const [employeeList, setEmployeeList] = useState<EmployeeListQuery[]>([]);

    useEffect(() => {
        fetch("api/employees/list")
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setEmployeeList(data as EmployeeListQuery[]);
            console.log(data);
          });
      }, []);
    return (
    <>
        <Typography variant="h3" sx={{ textAlign: "center", mt: 4, mb: 4 }}>
        Employees List
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 768 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableHeadCell>Firstname</StyledTableHeadCell>
              <StyledTableHeadCell>Lastname</StyledTableHeadCell>
              <StyledTableHeadCell>Department</StyledTableHeadCell>
              <StyledTableHeadCell>Address</StyledTableHeadCell>
              <StyledTableHeadCell>Email</StyledTableHeadCell>
              <StyledTableHeadCell>Phone</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeList.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>-</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
    )
}

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
    },
  }));