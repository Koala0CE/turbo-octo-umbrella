import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

interface Props {
  onSubmit: (emails: string[]) => void;
}

const EmailForm = ({ onSubmit }: Props) => {
  const [emails, setEmails] = useState<string[]>([""]);
  const [emailErrors, setEmailErrors] = useState<boolean[]>([false]);
  const [isSubmitting, setSubmitting] = useState(false);

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);

    // field error prop
    const newEmailErrors = [...emailErrors];
    newEmailErrors[index] = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailErrors(newEmailErrors);
  };

  const handleAddEmail = () => {
    setEmails([...emails, ""]);
  };

  const handleRemoveEmail = (index: number) => {
    const newEmails = [...emails];
    newEmails.splice(index, 1);
    setEmails(newEmails);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //  validating email addresses
    const validEmails = emails.filter((email) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    );
    setSubmitting(true);

    // attempt to submit a sorted list of valid emails
    try {
      await onSubmit(
        validEmails.sort((a, b) => {
          // valid email addresses are  sorted alphabetically by domain first and then by username
          const [leftA, domainA] = a.split("@");
          const [leftB, domainB] = b.split("@");
          if (domainA === domainB) {
            return leftA.localeCompare(leftB);
          } else {
            return domainA.localeCompare(domainB);
          }
        })
      );
      setEmails([""]);
    } catch (error) {
      console.error(error, "error");
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {emails.map((email, index) => (
        <div key={index}>
          <TextField
            required
            margin="dense"
            variant="standard"
            label={`Email ${index + 1}`}
            type="email"
            id={`email-${index}`}
            value={email}
            error={emailErrors[index]}
            helperText={
              emailErrors[index] ? "Please enter a valid email address" : null
            }
            onChange={(event) => handleEmailChange(index, event.target.value)}
          />

          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => handleRemoveEmail(index)}
          >
            <Delete />
          </IconButton>
        </div>
      ))}
      <Typography p={1} variant="caption" color="HighlightText">
        When Chuck Norris sends an email, he doesn't need a subject line or a
        message. The recipient already knows what's coming.
      </Typography>

      <Box
        paddingTop={3}
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="end"
      >
        <Button
          aria-label="add email"
          onClick={handleAddEmail}
          variant="text"
          disabled={emails.length === 0}
          endIcon={<AddIcon />}
        >
          Add Email
        </Button>
        <Box width={10} bgcolor={"red"}></Box>

        <Button
          aria-label="send"
          type="submit"
          variant="contained"
          disabled={emails.length === 0 || isSubmitting}
          endIcon={
            isSubmitting ? (
              <CircularProgress size={16} />
            ) : (
              <ForwardToInboxIcon />
            )
          }
        >
          {isSubmitting ? "Sending..." : "Send"}
        </Button>
      </Box>
    </form>
  );
};

export default EmailForm;
