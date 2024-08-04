import React from "react";
import ReactModal from "react-modal";

interface SignupModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Signup Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          height: "500px",
          width: "400px",
        },
      }}
    >
      <form>
        {/* Add your form fields here */}
        <button
          type="button"
          onClick={onRequestClose}
          style={{
            width: "30px",
            fontSize: "30px",
            cursor: "pointer",
            backgroundColor: "transparent",
            border: "none",
          }}
        >
          x
        </button>
      </form>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "50px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src="/X_logo.png" style={{ width: "50px" }}></img>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <form>
          <input
            style={{
              width: "100%",
              height: "50px",
              border: "1px solid black",
              backgroundColor: "lightgray", // 배경 색상 추가
              marginBottom: "10px",
              color: "black", // 텍스트 색상 추가
              padding: "10px",
            }}
            placeholder="이메일"
          />
          <input
            style={{
              width: "100%",
              height: "50px",
              border: "1px solid black",
              backgroundColor: "lightgray", // 배경 색상 추가
              padding: "10px",
              marginBottom: "50px",
            }}
            placeholder="닉네임"
          />
          <button
            type="submit"
            style={{
              width: "100%",
              height: "50px",
              borderRadius: "30px",
              backgroundColor: "rgb(29, 155, 240)",
            }}
          >
            제출
          </button>
        </form>
      </div>
    </ReactModal>
  );
};

export default SignupModal;
