import ForgeUI, {
  Button,
  ContentAction,
  ModalDialog,
  render,
  useProductContext,
  useState,
} from "@forge/ui";
import { getPageData } from "./utils";
ForgeUI;

const App = () => {
  const context = useProductContext();
  const pageId = context.contentId;
  const [isOpen, setOpen] = useState(true);

  const handleClick = async () => {
    const res = await getPageData(pageId);
    console.log(res);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalDialog header="Hello" onClose={() => setOpen(false)}>
      <Button onClick={handleClick} text="Get pages" />
    </ModalDialog>
  );
};

export const run = render(
  <ContentAction>
    <App />
  </ContentAction>
);
