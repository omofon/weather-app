export default function RadioOption({ id, name, label, checked, onChange }) {
  return (
    <label
      htmlFor={id}
      className="w-full p-2 rounded-md flex items-center justify-between cursor-pointer bg-card hover:cursor-pointer hover:bg-paper transition-colors duration-200"
    >
      <span className="text-sm text-font-main">{label}</span>
      <input
        type="radio"
        name={name}
        id={id}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      {checked && (
        <img
          src="assets/images/icon-checkmark.svg"
          alt="selected"
          className="w-3 h-3"
        />
      )}
    </label>
  );
}
