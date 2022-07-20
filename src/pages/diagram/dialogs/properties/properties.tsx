import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import * as S from "./styles";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const Properties: React.FC<Props> = ({ isOpen, onClose }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  console.log({ value });

  return (
    <S.Wrapper open={isOpen} onClose={onClose}>
      <S.Title>Propriedades</S.Title>

      <S.Content>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            centered
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Propriedade" {...a11yProps(0)} />
            <Tab label="Customização" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          Item One
          <button onClick={() => setValue(1)}>Proximo</button>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
      </S.Content>
    </S.Wrapper>
  );
};
