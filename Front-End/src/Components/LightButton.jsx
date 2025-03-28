export function LightButton({ name, type = "button", onClick }) {
  return (
    <button
      type={type}
      className="bg-slate-200 rounded-xl py-2 mt-2 cursor-pointer active:bg-white transition-colors duration-300 ease-out"
      onClick={onClick}
    >
      <p className="text-center">{name}</p>
    </button>
  );
}
