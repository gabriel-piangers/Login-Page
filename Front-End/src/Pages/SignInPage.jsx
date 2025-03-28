import { InputField } from "../Components/InputField";
import { Link, useNavigate } from "react-router";
import { validateEmail, validatePassword } from "../scripts/utils";
import { useState } from "react";
import { InvalidMessage } from "../Components/InvalidMessage";
import { DarkButton } from "../Components/DarkButton";
import { LightButton } from "../Components/LightButton";

export function RegisterPage() {
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [passwordMismatch, setPassowrdMismatch] = useState(false);
  const [sucess, setSucess] = useState(false);
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    const [validEmail, validPass, matchedPass] = [
      validateEmail(payload.email),
      validatePassword(payload.password),
      payload.password === payload.c_password,
    ];
    validEmail ? setInvalidEmail(false) : setInvalidEmail(true);
    validPass ? setInvalidPassword(false) : setInvalidPassword(true);
    matchedPass ? setPassowrdMismatch(false) : setPassowrdMismatch(true);
    if (validEmail && validPass && matchedPass) {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: payload.username,
            email: payload.email,
            password: payload.password,
          }),
        }
      );
      if (response.status === 201) {
        setSucess(true);
      }
    }
  };
  if (!sucess) {
    return (
      <div className="flex flex-col">
        <h1 className="text-3xl mx-auto mt-5 mb-8">Sign In</h1>
        <div className="mx-auto px-12 py-10 bg-white rounded-xl">
          <form onSubmit={submitForm} className="flex flex-col gap-6">
            <InputField name={"username"} label={"Nome de usuário"} />
            <InputField label={"email"} />
            {invalidEmail && <InvalidMessage p={"Insira um email válido"} />}
            <InputField name={"password"} label={"senha"} type="password" />
            {invalidPassword && (
              <InvalidMessage
                p={
                  "A senha deve conter um minimo de 8 caracteres tendo pelo menos 1 maiuscula 1 minuscula e 1 número"
                }
              />
            )}
            <InputField
              name={"c_password"}
              label={"confirme a senha"}
              type="password"
            />
            {passwordMismatch && (
              <InvalidMessage p={"Reescreva exatamente a mesma senha!"} />
            )}
            <div className="flex flex-col gap-1">
              <DarkButton name="Cadastrar" type="submit" />
              <LightButton name="Fazer Login" onClick={() => navigate("/")} />
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col">
        <h1 className="text-3xl mx-auto mt-5 mb-8">Sign In</h1>
        <div className="mx-auto px-12 py-10 bg-white rounded-xl">
          <p className="text-2xl mx-auto mt-5 mb-8">
            Cadastro efetuado com sucesso!
          </p>
          <div className="flex">
            <DarkButton
              name="Fazer Login"
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
