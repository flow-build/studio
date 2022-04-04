import React from "react";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import EmptyContent from "./components/EmptyContent/EmptyContent";

import { useCompare } from "pages/CompareJson/hooks/useCompare";

import { Tree } from "pages/CompareJson/components/Tree";

import "./json.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CompareJson = () => {
  const compareHook = useCompare();

  if (!compareHook.hasDataToCompare) {
    return <EmptyContent />;
  }

  const { current, previous } = compareHook.jsonDiff;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container columns={12}>
        <Grid item xs={6}>
          <Item>
            {previous.map((item, index) => (
              <Tree key={index} {...item} />
            ))}
          </Item>
        </Grid>

        <Grid item xs={6}>
          <Item>
            {current.map((item, index) => (
              <Tree key={index} {...item} />
            ))}
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompareJson;
