import { FC, ReactNode } from "react";
import { Form } from "@remix-run/react";

import { styles } from "./styles";

type AuthFormProps = {
  children?: ReactNode;
}

export const AuthForm: FC<AuthFormProps> = () => {
  return (
    <Form action="" method="POST">
      <div style={styles.root}>
        <div>
          <label htmlFor="username">Username</label>
          <br/>
          <input id="username" name="username" type="text"/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <br/>
          <input id="password" name="password" type="password"/>
        </div>
        <button type="submit">Submit</button>
      </div>
    </Form>
  )
}