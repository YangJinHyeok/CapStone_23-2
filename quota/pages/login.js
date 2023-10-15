import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Form } from "semantic-ui-react";
import Axios from "axios";
import GoogleButton from "./GoogleButton";

import Link from "next/link";

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const router = useRouter();

  function login() {
    const { username, password } = formData;

    const formDataToSend = new FormData();
    formDataToSend.append("username", username);
    formDataToSend.append("password", password);

    Axios.post("http://localhost:8080/login", formDataToSend, { withCredentials: true })

      .then((res) => {
        if (res.status === 200) {
          router.push("http://localhost:8080/articles");
        } else {
          router.push("/chat");
        }
      })
      .catch((error) => {
        console.error(error);
        // 에러 처리
      });
  }
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <div style={{ padding: "100px 0", textAlign: "center" }}>
      <Form>
        <Form.Field inline>
          <input
            name="username"
            placeholder="ID"
            value={formData.username}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field inline>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Button color="blue" onClick={login}>
          Login
        </Button>
        <GoogleButton />
      </Form>
    </div>
  );
}
