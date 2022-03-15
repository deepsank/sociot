import { useState, useContext } from "react";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import UserContext from "../../store/UserContext";
import PostContext from "../../store/PostContext";
import UserCommentsContext from "../../store/UserCommentsContext";

import axios from "axios";

const CreateComment = ({ postId }) => {
  const [comment, setComment] = useState("");

  const UserCtx = useContext(UserContext);
  const PostCtx = useContext(PostContext);
  const UserCommentsCtx = useContext(UserCommentsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("auth-token");
    await axios
      .post(
        `${process.env.REACT_APP_API_ENDPOINT}/comments/create`,
        { text: comment, postId: postId },
        {
          headers: { "auth-token": token },
        }
      )
      .then((res) => {
        const { _id, _post, createdAt, text } = res.data.newComment;
        const newComment = {
          _id,
          text,
          createdAt,
          _post,
          _creator: UserCtx.userData,
        };
        UserCommentsCtx.userComments.unshift(newComment);

        const newPosts = PostCtx.posts.map((post) => {
          if (post._id === _post) {
            post._comments.unshift(newComment);
          }
          return post;
        });
        PostCtx.setPosts(newPosts);

        setComment("");
      });
  };
  return (
    <Paper
      sx={{
        minHeight: "100px",
        padding: "15px 20px",
        border: "1px solid #f3f3f3",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <TextareaAutosize
          style={{
            minHeight: "50px",
            width: "675px",
            padding: "10px",
            border: "none",
            backgroundColor: "transparent",
            outline: "none",
            fontFamily: "Inter",
            fontSize: "16px",
          }}
          placeholder="Write an awesome comment :)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          type="submit"
          sx={{
            background: "#1da1f2",
            color: "#fff",
            width: "90px",
            height: "40px",
            borderRadius: "50px",
            "&:hover": {
              background: "#65BFF6",
            },
            fontSize: "15px",
            textTransform: "none",
            fontFamily: "Inter",
            alignSelf: "flex-end",
            margin: "15px 20px 0 0",
          }}
        >
          Comment
        </Button>
      </form>
    </Paper>
  );
};

export default CreateComment;
