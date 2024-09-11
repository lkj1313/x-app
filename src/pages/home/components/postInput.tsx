import { useEffect, useRef } from "react";
import { CiImageOn } from "react-icons/ci";

interface PostInputProps {
  textareaContext: string;
  onTextareaChange: (value: string) => void;
  onPost: (text: string) => void; // text 인수를 받음
}

const PostInput = ({
  textareaContext,
  onTextareaChange,
  onPost,
}: PostInputProps) => {
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTextareaChange(e.target.value); // 부모에게 상태 업데이트 요청
  };
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
      onPost(textareaContext); // onPost 호출 시 text 전달
      onTextareaChange(""); // 게시 후 textareaContext 리셋
    }
  };

  return (
    <div className="home-page__post">
      <textarea
        ref={textareaRef} // textarea에 ref 연결
        placeholder="What is happening?"
        value={textareaContext} // 부모에서 받은 상태
        onChange={handleTextareaChange} // 상태 변화 전달
        rows={3}
        className="home-page__textarea"
      />
      <div className="home-page__controls">
        <CiImageOn className="home-page__controls-icon" size={30} />
        <button className="home-page__controls-button" onClick={handlePost}>
          게시하기
        </button>
      </div>
    </div>
  );
};

export default PostInput;
