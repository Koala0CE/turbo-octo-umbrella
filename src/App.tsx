import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import "./App.css";
import { EmailFieldComponent } from "./components/EmailField";
import { useState } from "react";

interface DataRow {
  id: number;

  email: string;
}

function App() {
  const [email, setEmail] = useState("");
  const [data, setData] = useState<DataRow[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = () => {
    // Handle submit logic here, such as sending the email or showing the joke

    const newData = [...data, { id: data.length + 1, email }];

    setData(newData);

    setEmail("");

    console.log(data, "Data emails array");
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        minWidth={"100vh"}
        bgcolor={"white"}
        m={2}
      >
        <form onSubmit={handleSubmit}>
          <EmailFieldComponent
            label="Email Address"
            value={email}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}

export default App;
