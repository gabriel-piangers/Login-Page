import { InputField } from "../Components/InputField";
import { Link } from "react-router";
import { validateEmail, validatePassword } from "../scripts/utils";

export function LoginPage() {

  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    if (!validateEmail(payload.email)) return console.log("Invalid email");
    if (!validatePassword(payload.senha)) return console.log("Invalid Password");
    console.log(payload);
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl mx-auto mt-5 mb-8">Login Page</h1>
      <div className="mx-auto p-8 bg-white rounded-xl">
        <form onSubmit={submitForm} className="flex flex-col gap-6">
          <InputField label={"email"} />
          <div>
            <InputField label={"senha"} type="text" />
            <p className="text-sm text-blue-500 cursor-pointer">
              Esqueci minha senha
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <button
              type="submit"
              className="bg-slate-800 text-white rounded-xl py-2 mt-2 cursor-pointer active:bg-slate-600 transition-colors duration-300 ease-out"
            >
              Login
            </button>
            <Link
              to="/register"
              className="bg-slate-200 rounded-xl py-2 mt-2 cursor-pointer active:bg-white transition-colors duration-300 ease-out"
            >
              <p className="text-center">Não tem uma conta? Cadastre-se</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
