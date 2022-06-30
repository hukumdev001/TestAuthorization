import React, { useState } from "react";

import * as ActionTypes from "@constants/actionTypes";
import { Comment as CommentType } from "@@types/Comment";

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const Comments = ({
  articleId,
  comments,
}: {
  articleId: string;
  comments: CommentType[];
}) => {
  return (
    <div className="py-12 px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center w-full">
      <div className="flex flex-col justify-start items-start w-full space-y-8">
        <div className="flex justify-start items-start">
          <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
            Comments
          </p>
        </div>
        {comments &&
          comments.map((comment) => (
            <Comment comment={comment} key={comment._id} />
          ))}
        <CommentBox articleId={articleId} />
      </div>
    </div>
  );
};

const Comment = ({ comment }: { comment: CommentType }) => {
  return (
    <div className="w-full flex justify-start items-start flex-col bg-gray-50 p-8">
      <div className="flex flex-col md:flex-row justify-between w-full">
        <div className="flex flex-row justify-between items-start">
          <div className="mt-6 flex justify-start items-center flex-row space-x-2.5">
            <div>
              <img
                src="https://i.ibb.co/QcqyrVG/Mask-Group.png"
                alt="girl-avatar"
              />
            </div>
            <div className="flex flex-col justify-start items-start space-y-2">
              <p className="text-base font-medium leading-none text-gray-800 capitalize">
                {comment.email}
              </p>
              <p className="text-sm leading-none text-gray-600">
                {formatDate(comment?.createdAt || "")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={"md:block "}>
        <p className="mt-3 text-base leading-normal text-gray-600 w-full text-justify">
          {comment.comment}
        </p>
      </div>
    </div>
  );
};

const CommentBox = ({ articleId }: { articleId: string }) => {
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [ratings, setRatings] = useState(0);

  const { slug } = useParams();

  const dispatch = useDispatch();

  React.useEffect(() => {
    const guestEmail = localStorage.getItem("guestEmail");
    if (guestEmail) {
      setEmail(guestEmail);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("guestEmail", email);
    dispatch({
      type: ActionTypes.Comment.CREATE_COMMENT,
      payload: {
        comment: { email, comment, articleId, ratings },
        articleSlug: slug,
      },
    });
    setComment("");
    setRatings(0);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="w-full flex flex-col p-8 bg-gray-50">
        <label className="text-base font-semibold leading-none text-gray-800">
          <div className="flex justify-between">
            <h3>Write a Comment</h3>
            <Ratings ratings={ratings} setRatings={setRatings} />
          </div>
        </label>
        <input
          type="email"
          className=" leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4  border rounded border-gray-200 placeholder-gray-700 "
          name="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          tabIndex={0}
          aria-label="Leave a Comment"
          role="textbox"
          name="comment"
          className="h-36 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4  border rounded border-gray-200 placeholder-gray-700 resize-none"
          placeholder="Leave a Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <div className="flex justify-start w-full">
          <button
            className="mt-9 text-base font-semibold leading-none text-white py-4 px-10 bg-indigo-700 rounded hover:bg-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none"
            type="submit"
          >
            SUBMIT
          </button>
        </div>
      </div>
    </form>
  );
};

const Ratings = ({ ratings, setRatings }: RatingsProps) => {
  const renderStars = (n: number, setRatings: (rating: number) => void) => {
    let stars = [];
    for (let i = 1; i <= n; ++i) {
      stars.push(
        <svg
          className="mx-1 w-4 h-4 fill-current text-yellow-500 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          onClick={() => setRatings(i)}
          key={i}
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      );
    }
    for (let i = n; i < 5; i++) {
      stars.push(
        <svg
          className="mx-1 w-4 h-4 fill-current text-gray-400 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          onClick={() => setRatings(i + 1)}
          key={i + "ra"}
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      );
    }
    return stars;
  };
  return (
    <div className="flex justify-center items-center">
      <div className="flex items-center mt-2 mb-4">
        {renderStars(ratings, setRatings)}
      </div>
    </div>
  );
};

function formatDate(date: string) {
  const d = new Date(date);
  return d.toDateString() || date;
}

interface RatingsProps {
  ratings: number;
  setRatings: (rating: number) => void;
}

export default Comments;
