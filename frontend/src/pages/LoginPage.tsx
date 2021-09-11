import { Box, Container, TextField, Button, makeStyles } from "@material-ui/core";
import { useState } from "react";
import { ILoginPageProps } from "../interfaces/Interfaces";
import { signInEndpoint } from "../services/apiService";

const useStyles = makeStyles({
  error: {
    backgroundColor: "rgb(253,236,234)",
    borderRadius: "4px",
    padding: "16px",
    margin: "16px 0",
  },
});

export default function LoginPage(props: ILoginPageProps) {
  const classes = useStyles();

  const [email, setEmail] = useState("usuario@email.com");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");

  function signIn(evt: React.FormEvent) {
    evt.preventDefault();
    signInEndpoint(email, password).then(props.onSignIn, (e) =>
      setError("Email ou senha incorretos.")
    );
  }

  return (
    <Container maxWidth="sm">
      <h1>React-Despesas</h1>
      <p>
        Digite email e senha para entrar no sistema. Para testar, use o e-mail{" "}
        <kbd>usuario@email.com</kbd> e a senha <kbd>1234</kbd>
      </p>
      <form onSubmit={signIn}>
        <TextField
          margin="normal"
          label="E-mail"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <TextField
          type="password"
          margin="normal"
          label="Password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        {error && <div className={classes.error}>{error}</div>}
        <Box textAlign="right" marginTop="16px">
          <Button type="submit" variant="contained" color="primary">
            Entrar
          </Button>
        </Box>
      </form>
    </Container>
  );
}
