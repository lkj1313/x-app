import React, { useEffect, useState } from "react";
import PostItem from "./postItem";
import { Post } from "..";
import { db } from "../../../../firebase";
import { collection, getDocs } from "firebase/firestore";
interface PostListProps {
  posts: Post[];
}
const fetchPosts = async (): Promise<Post[]> => {
  const postsCollection = collection(db, "posts"); // "posts" 컬렉션 참조
  const postsSnapshot = await getDocs(postsCollection); // 컬렉션에서 문서들 가져오기
  const postsList = postsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Post, "id">), // Post 타입으로 변환, id 제외
  })); // 문서 데이터를 배열로 변환

  return postsList;
};
const PostList: React.FC<PostListProps> = ({ posts }) => {
  const [dbPosts, setDbPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const postsData = await fetchPosts();
      setDbPosts(postsData); // 가져온 데이터를 상태로 설정
    };

    loadPosts(); // 데이터를 불러오는 함수를 호출
  }, [posts]);

  return (
    <div className="home-page__posts">
      {dbPosts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
