import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import "./App.css";
const API_URL = import.meta.env.VITE_API_URL;
const endPoint = "/api/jokes";

import { useState } from "react";
import EmailForm from "./components/EmailForm";

import spring from "./assets/spring.png";
import spring1 from "./assets/spring1.png";

function App() {
  const [emails, setEmails] = useState<string[]>([]);

  const handleSubmit = async (validEmails: string[]) => {
    setEmails(validEmails);

    // send a POST request to the API with the list of emails
    const response = await fetch(`${API_URL}${endPoint}`, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
      },
      body: JSON.stringify(emails),
    });

    console.log(response, "Response");

    if (!response.ok) {
      const error = await response.json();
      console.error(`Error sending emails: ${error.message}`);
      return;
    }

    const data = await response.json();
    console.log(data.message);
  };

  return (
    <>
      <Grid
        color={"red"}
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        sx={{ display: "flex", height: "100%" }}
      >
        <Card sx={{ maxWidth: 345, height: "100%" }}>
          <CardMedia sx={{ height: 190 }} image={spring} title="spring" />
          <CardContent>
            <Typography variant="h5" color={"purple"}>
              Emails
            </Typography>
            <EmailForm onSubmit={handleSubmit} />
          </CardContent>
        </Card>

        {emails.length > 0 && (
          <>
            <Divider orientation="vertical" flexItem>
              X
            </Divider>
            <Card sx={{ maxWidth: 345, height: "100%" }}>
              <CardMedia sx={{ height: 190 }} image={spring1} title="spring" />

              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  color={"red"}
                >
                  Email Addresses
                </Typography>

                <Typography p={1} variant="body2" color="GrayText">
                  You have successfully sent a random Chuck Norris Joke to the
                  following emails:
                </Typography>

                <Table>
                  <TableHead></TableHead>
                  <TableBody>
                    {emails.map((email, index) => (
                      <TableRow key={index}>
                        <TableCell>{email}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Box height={79}></Box>
              </CardContent>
            </Card>
          </>
        )}
      </Grid>
    </>
  );
}

export default App;
