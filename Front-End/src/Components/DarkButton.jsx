export function DarkButton({name, type = "button", onClick}) {
  return (
    <button
      type={type}
      className="bg-slate-800 text-white rounded-xl w-[100%] py-2 mt-2 cursor-pointer active:bg-slate-600 transition-colors duration-300 ease-out"
      onClick={onClick}
    >
      {name}
    </button>
  );
}
