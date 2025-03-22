export function InputField({label, name,placeholder = 'Digite aqui...', type = 'text', }) {
    if (!name) name = label
    return (
        <div className="flex flex-col gap-1 w-[300px]">
        <label htmlFor={name}>{`${label}:`}</label>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className="border rounded-md bg-white px-1 py-0.5"
        />
      </div>
    )
}