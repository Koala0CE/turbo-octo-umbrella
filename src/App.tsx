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
import { useCallback, useState } from "react";

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

  const handleSubmit = useCallback(() => {
    // Handle submit logic here, such as sending the email or showing the joke
    const newData = [...data, { id: data.length + 1, email }];
    // sort the data by first the domain
    // then by left side text
    const sortedData = newData.sort((a, b) => {
      const [aText, aDomain] = a.email.split("@");
      const [bText, bDomain] = b.email.split("@");
      const domainCompare = aDomain.localeCompare(bDomain);
      if (domainCompare !== 0) {
        return domainCompare;
      }
      return aText.localeCompare(bText);
    });
    setData(sortedData);
    // console.log("Sorted Data by domain and name", sortedData);

    setEmail("");
  }, [data, email]);

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
