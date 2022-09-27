import "./customSelect.css";

export default function CustomSelect({
  name,
  value,
  onSelect,
  label,
  children,
}) {
  return (
    <div className="customSelect">
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} onChange={onSelect} value={value}>
        {children}
      </select>
    </div>
  );
}
