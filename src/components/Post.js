import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createComment, toggleLike } from "../api";
import { usePosts } from "../hooks";
import styles from "../styles/home.module.css";
import { Comment } from "./";
let unlikeImgSrc = "https://cdn-icons-png.flaticon.com/512/1077/1077035.png";
let likeImgSrc = "https://cdn-icons-png.flaticon.com/512/1076/1076984.png";

const Post = ({ post }) => {
  const [comment, setComment] = useState("");
  const [creatingComment, setCreatingComment] = useState(false);
  const posts = usePosts();
  const [isLiked, setIsLiked] = useState(false);

  const handleAddComment = async (e) => {
    if (e.key === "Enter") {
      setCreatingComment(true);

      const response = await createComment(comment, post._id);

      if (response.success) {
        setComment("");
        posts.addComment(response.data.comment, post._id);
        toast.success("Comment created successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(response.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      setCreatingComment(false);
    }
  };

  const handlePostLikeCLick = async () => {
    const response = await toggleLike(post._id, "Post");
    console.log("like response", response);

    if (response.success) {
      if (response.data.deleted) {
        setIsLiked(false);
        posts.addLike(response.data.like, post._id, response.data.deleted);

        toast("Unliked !!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        setIsLiked(true);
        posts.addLike(response.data.like, post._id, response.data.deleted);

        toast("Liked !!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      toast.error(response.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className={styles.postWrapper} key={`post-${post._id}`}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
            alt="user-pic"
          />
          <div>
            <Link
              to={`/user/${post.user._id}`}
              state={{ user: post.user }}
              className={styles.postAuthor}
            >
              {post.user.name}
            </Link>
            <span className={styles.postTime}>a minute ago</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <button onClick={handlePostLikeCLick}>
              <img
                src={unlikeImgSrc}
                alt="likes-icon"
                style={{
                  backgroundColor: isLiked ? "salmon" : "",
                  color: isLiked ? "white" : "",
                }}
              />
            </button>
            <span>{post.likes.length}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/2593/2593491.png"
              alt="comments-icon"
            />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
            placeholder="Start typing a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleAddComment}
          />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={`comment-${comment._id}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
