interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  onChange,
  errorMessage,
}) => (
  <>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        height: "50px",
        border: "1px solid black",
        backgroundColor: "lightgray",
        padding: "10px",
        marginBottom: "5px",
      }}
    />
    {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
  </>
);

export default InputField;
