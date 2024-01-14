import ForgeUI, { ContentAction, render, useProductContext, useState } from "@forge/ui";
import { addLabelsToPage, generateLabelsWithChatGPT, getPageData } from "./api";
ForgeUI;

const App = () => {
  const context = useProductContext();
  const pageId = context.contentId;

  const [_generated] = useState(async () => {
    const page = await getPageData(pageId);
    const prompt = `Here is the data:"${page.body.storage.value}"
  Give me the 5 most important keywords from the text. Return the results in the form of a JavaScript array. 
  The response shouldn't contain anything apart from the array. No extra text or JavaScript formatting.`;
    const labels = await generateLabelsWithChatGPT(prompt);
    await addLabelsToPage(pageId, JSON.parse(labels));
    return true;
  });

  return null;
};

export const run = render(
  <ContentAction>
    <App />
  </ContentAction>
);
