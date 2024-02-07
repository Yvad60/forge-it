import ForgeUI, { DashboardGadget, Text, render, useProductContext } from "@forge/ui";
ForgeUI;

const App = () => {
  const {
    extensionContext: { gadgetConfiguration },
  } = useProductContext();

  return (
    <DashboardGadget>
      <Text>{`Hello ${gadgetConfiguration.name || "world"}`}</Text>
    </DashboardGadget>
  );
};

export const run = render(<App />);
