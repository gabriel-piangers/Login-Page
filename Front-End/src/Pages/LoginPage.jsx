import { InputField } from "../Components/InputField";
import { Link, useNavigate } from "react-router";
import { validateEmail, validatePassword } from "../scripts/utils";
import { useState } from "react";
import { InvalidMessage } from "../Components/InvalidMessage";
import { useUser } from "../Providers/UserProvider";
import { DarkButton } from "../Components/DarkButton";
import { LightButton } from "../Components/LightButton";

export function LoginPage() {
  const [noUserFound, setNoUserFound] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    if (!validateEmail(payload.email)) return setNoUserFound(true);
    if (!validatePassword(payload.password)) return setNoUserFound(true);
    setNoUserFound(false);
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
        }),
      }
    );
    if (response.status >= 400 && response.status <= 499) {
      return setNoUserFound(true);
    } else {
      const data = await response.json();
      console.log(data);
      login(data);
      navigate("/logged");
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl mx-auto mt-5 mb-8">Login Page</h1>
      <div className="mx-auto p-8 bg-white rounded-xl">
        <form onSubmit={submitForm} className="flex flex-col gap-6">
          <InputField label={"email"} />
          <div>
            <InputField name={"password"} label={"senha"} type="text" />
            <p className="text-sm text-blue-500 cursor-pointer">
              Esqueci minha senha
            </p>
          </div>
          {noUserFound && <InvalidMessage p={"Email ou senha Incorretos"} />}
          <div className="flex flex-col gap-1">
            <DarkButton name="Login" type="submit" />
            <LightButton
              name="Não tem uma conta? Cadastre-se"
              onClick={() => navigate("/register")}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
