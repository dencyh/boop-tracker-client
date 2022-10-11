/* eslint-disable react/no-children-prop */
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Comment = ({ comment }) => {
  const markdown = "# Hello";
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>;
};

export default Comment;
