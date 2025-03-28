import { DarkButton } from "../Components/DarkButton";
import { LightButton } from "../Components/LightButton";
import { useUser } from "../Providers/UserProvider";
import { Link, useNavigate } from "react-router";

export function LoggedPage() {
  const { userData, logout } = useUser();
  const navigate = useNavigate();

  if (userData) {
    const { user } = userData;
    return (
      <div className="flex flex-col py-12">
        <div className="mx-auto p-8 bg-white rounded-xl w-[50%] min-w-[450px] max-w-[750px]">
          <h1 className="text-3xl text-center mx-auto mt-5 mb-8">
            {`Olá, você está logado como:`}
          </h1>
          <h1 className="text-3xl text-center mx-auto mt-5 mb-8">
            {user.username}
          </h1>
          <DarkButton name={"sair"} onClick={logout} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col py-12">
        <div className="mx-auto py-8 px-[5%]  bg-white rounded-xl w-[50%] min-w-[450px] max-w-[600px]">
          <h1 className="text-3xl text-center mx-auto mt-5 mb-8">
            {`Por favor efetue Login`}
          </h1>
          <h1 className="text-3xl text-center mx-auto mt-5 mb-8"></h1>{" "}
          <div className="flex flex-col gap-1">
            <DarkButton name="Fazer Login" onClick={() => navigate("/")} />
            <LightButton
              name="Não tem uma conta? Cadastre-se"
              onClick={() => navigate("/register")}
            />
          </div>
        </div>
      </div>
    );
  }
}
