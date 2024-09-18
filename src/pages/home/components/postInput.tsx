import { useEffect, useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
interface PostInputProps {
  textareaContext: string;
  onTextareaChange: (value: string) => void;
  onPost: (text: string, image: File | null) => Promise<void>; // 반환 타입을 Promise<void>로 수정
}

const PostInput = ({
  textareaContext,
  onTextareaChange,
  onPost,
}: PostInputProps) => {
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTextareaChange(e.target.value); // 부모에게 상태 업데이트 요청
  };
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // 이미지 파일 상태

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // autoResizeTextarea 함수를 컴포넌트 내에서 정의
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = "auto"; // 기존 높이를 초기화
      textarea.style.height = `${textarea.scrollHeight}px`; // 스크롤 높이에 맞춰 높이 설정
    }
  }, [textareaContext]); // textareaContext가 변경될 때마다 실행

  const handlePost = () => {
    if (textareaContext.trim()) {
      onPost(textareaContext, selectedImage); // 글과 이미지를 함께 부모로 전달
      onTextareaChange(""); // 글 상태 초기화
      setSelectedImage(null); // 이미지 상태 초기화
    }
  };

  // 이미지 선택 시 호출되는 함수
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file); // 선택된 이미지 파일을 상태에 저장
    }
  };

  const user = useSelector((state: RootState) => state.auth.user);
  const profileImg = user?.profilePicture;
  return (
    <div className="home-page__post-container">
      <div className="home-page__profile-textare-container">
        <div className="home-page__profile-container">
          <img src={profileImg} alt="profile-img" />
        </div>
        <div className="home-page__textarea-container">
          <textarea
            ref={textareaRef} // textarea에 ref 연결
            placeholder="What is happening?"
            value={textareaContext} // 부모에서 받은 상태
            onChange={handleTextareaChange} // 상태 변화 전달
            rows={3}
            className="home-page__textarea"
          />{" "}
        </div>
      </div>
      <div className="home-page__controls-container">
        <div style={{ flex: "0.1" }}></div>
        <div style={{ flex: "0.8" }} className="home-page__controls">
          <label htmlFor="file-input">
            <CiImageOn className="home-page__img-icon" size={30} />
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange} // 이미지 파일 선택 처리
          />
          <button className="home-page__controls-button" onClick={handlePost}>
            <span className="home-page__post-text">Post</span>
          </button>
        </div>
      </div>
      {selectedImage && (
        <div className="home-page__image-preview">
          <p>Image Preview:</p>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="preview"
            style={{ maxWidth: "50%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
};

export default PostInput;
