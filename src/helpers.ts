import { Comment, Content } from "./types";

const extractContent = (commentContent: Content) => {
  if (commentContent.content == undefined) {
    if (["text", "paragraph"].includes(commentContent.type)) {
      return [commentContent.text.trim()];
    }
    return [null];
  }
  let result = [];
  for (const content of commentContent.content) {
    result = [...result, ...extractContent(content)];
  }
  return result;
};

export const extractTextFromComments = (comments: Comment[]) => {
  const texts = [];
  comments.map((comment) => {
    for (const content of comment.body.content) {
      const textContent = extractContent(content).filter(Boolean);
      if (textContent.length > 0) texts.push(textContent.join(" "));
    }
  });

  return texts.join(" ");
};
