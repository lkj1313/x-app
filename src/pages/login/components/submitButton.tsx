import React from "react";
interface SubmitButtonProps {
  loginError: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ loginError }) => {
  return (
    <>
      {" "}
      <button
        type="submit"
        style={{
          width: "100%",
          height: "50px",
          borderRadius: "30px",
          backgroundColor: "#A9A9F5",
          cursor: "pointer",
        }}
      >
        로그인
      </button>
      {loginError && (
        <div style={{ color: "red", marginTop: "10px" }}>{loginError}</div>
      )}
    </>
  );
};

export default SubmitButton;
