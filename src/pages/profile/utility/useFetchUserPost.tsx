import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

import { db } from "../../../../firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import { Post } from "../../home";
import { User } from "../../../store/authSlice";

const useFetchUserPost = async (user: User) => {
  if (!user) return [];

  try {
    const q = query(
      collection(db, "posts"),
      where("author.userEmail", "==", user.email)
    );
    const querySnapshot = await getDocs(q);
    const postsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[];

    return postsData;
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

export default useFetchUserPost;
