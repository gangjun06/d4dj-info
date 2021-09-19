import React, { useContext, useMemo } from "react";
import {
  SideSheet,
  Pane,
  Heading,
  Paragraph,
  Tablist,
  Tab,
  Card,
  Button,
  TextInputField,
} from "evergreen-ui";
import { Live2DContext } from "./context";
import { useWindowWidth } from "@react-hook/window-size";

type props = {
  isShown: boolean;
  onClose: () => void;
};

function Content({ selectedIndex }: { selectedIndex: number }) {
  const { background } = useContext(Live2DContext);
  switch (selectedIndex) {
    case 0:
      return <Heading>Some content</Heading>;
    case 1:
      return (
        <TextInputField
          isInvalid={false}
          required
          value={background}
          label="Background Image"
          // description="This is a description."
          validationMessage="This field is required"
        />
      );
    default:
      return <></>;
  }
}

export function Setting({ isShown, onClose }: props) {
  // const [isShown, setIsShown] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const windowWidth = useWindowWidth();
  const sideSheetSize = useMemo(() => {
    if (windowWidth > 800) return undefined;
    if (windowWidth > 455) return 400;
    return windowWidth - 55;
  }, [windowWidth]);
  return (
    <React.Fragment>
      <SideSheet
        isShown={isShown}
        onCloseComplete={onClose}
        width={sideSheetSize}
        containerProps={{
          zIndex: 10,
          display: "flex",
          flex: "1",
          flexDirection: "column",
        }}
      >
        <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
          <Pane padding={16} borderBottom="muted">
            <Heading size={600}>Live2D Config</Heading>
            <Paragraph size={400} color="muted">
              Live2D configuration displayed on screen
            </Paragraph>
          </Pane>
          <Pane display="flex" padding={8}>
            <Tablist>
              {["Model", "Background"].map((tab, index) => (
                <Tab
                  key={tab}
                  isSelected={selectedIndex === index}
                  onSelect={() => setSelectedIndex(index)}
                >
                  {tab}
                </Tab>
              ))}
            </Tablist>
          </Pane>
        </Pane>
        <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
          <Content selectedIndex={selectedIndex} />
        </Pane>
      </SideSheet>
    </React.Fragment>
  );
}
