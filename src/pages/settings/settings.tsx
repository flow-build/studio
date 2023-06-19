import { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";

import { FlowbuildPanel } from "./components/flowbuild-panel";
import { MqttPanel } from "./components/mqtt-panel";
import { DashboardPanel } from "./components/dashboard-panel";

import * as S from "./styles";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index, ...props }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...props}
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

export const Settings: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <S.Wrapper>
      <S.Title>Configurações</S.Title>

      <Box sx={{ width: 700, height: 500 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            textColor="secondary"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Servidor Flowbuild" {...a11yProps(0)} />
            <Tab label="Servidor MQTT" {...a11yProps(1)} />
            <Tab label="Metabase" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <FlowbuildPanel />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MqttPanel />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <DashboardPanel />
        </TabPanel>
      </Box>
    </S.Wrapper>
  );
};
