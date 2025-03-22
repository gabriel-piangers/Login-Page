import { InputField } from "../Components/InputField";
import { Link } from "react-router";
import { validateEmail, validatePassword } from "../scripts/utils";
import { useState } from "react"
import { InvalidMessage } from "../Components/InvalidMessage";

export function RegisterPage() {
  const [invalidPassword, setInvalidPassword] = useState(false)
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [passwordMismatch, setPassowrdMismatch] = useState(false)

  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    const [validEmail, validPass, matchedPass] = [
      validateEmail(payload.email),
      validatePassword(payload.senha),
      payload.senha === payload.c_senha,
    ];
    (validEmail) ? setInvalidEmail(false) : setInvalidEmail(true);
    (validPass) ? setInvalidPassword(false) : setInvalidPassword(true);
    (matchedPass) ? setPassowrdMismatch(false) : setPassowrdMismatch(true);
    if (validEmail && validPass && matchedPass) {
      console.log(payload)
  };
}

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl mx-auto mt-5 mb-8">Login Page</h1>
      <div className="mx-auto px-12 py-10 bg-white rounded-xl">
        <form onSubmit={submitForm} className="flex flex-col gap-6">
          <InputField label={"email"} />
          {(invalidEmail &&
            <InvalidMessage p={"Insira um email válido"}/>
          )}
          <InputField label={"senha"} type="password" />
          {(invalidPassword &&
            <InvalidMessage p={"A senha deve conter um minimo de 8 caracteres tendo pelo menos 1 maiuscula 1 minuscula e 1 número"}/>
          )}
          <InputField
            name={"c_senha"}
            label={"confirme a senha"}
            type="password"
          />
          {(passwordMismatch && 
            <InvalidMessage p={"Reescreva exatamente a mesma senha!"}/>
          )}
          <div className="flex flex-col gap-1">
            <button
              type="submit"
              className="bg-slate-800 text-white rounded-xl py-2 mt-2 cursor-pointer active:bg-slate-600 transition-colors duration-300 ease-out"
            >
              Cadastrar
            </button>
            <Link
              to="/login"
              className="bg-slate-200 rounded-xl py-2 mt-2 cursor-pointer active:bg-white transition-colors duration-300 ease-out"
            >
              <p className="text-center">Fazer Login</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
