import { router } from "@forge/bridge";
import { FC, PropsWithChildren } from "react";

type Props = {
  href: string;
};

const Link: FC<PropsWithChildren<Props>> = ({ children, href }) => {
  const handleNavigate = () => {
    router.navigate(href);
  };

  return (
    <a className="cursor-pointer" onClick={handleNavigate}>
      {children}
    </a>
  );
};

export default Link;
