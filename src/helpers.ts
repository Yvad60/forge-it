import { Comment } from "./types";

export const extractTextFromComments = (comments: Comment[]) => {
  return comments.map((comment) => {
    return comment.body.content[0].content[0].text;
  });
};
