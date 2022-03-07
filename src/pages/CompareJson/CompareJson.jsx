import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { SnackbarNotification } from "components";

import { TextInput } from "pages/CompareJson/components/TextInput";
import { useCompareJson } from "pages/CompareJson/hooks/useCompareJson";

const CompareJson = () => {
  const { onCompare } = useCompareJson();

  const [payload, setPayload] = useState({ json1: "", json2: "" });
  const [snakbarOptions, setSnakbarOptions] = useState({
    isOpen: false,
    message: "",
  });

  const handleChangeText = (event, field) => {
    setPayload((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const onClickCompareButton = () => {
    const { data, isSuccess } = onCompare(payload.json1, payload.json2);

    if (!isSuccess) {
      return setSnakbarOptions({ isOpen: true, message: data.message ?? "" });
    }

    console.log({
      removedElements: data.removedElements ?? [],
      addedElements: data.addedElements ?? [],
    });
    return;
  };

  const handleCloseSnackbar = () => {
    setSnakbarOptions({ isOpen: false, message: "" });
  };

  return (
    <Grid container spacing={2} height="100%" gridTemplateRows="1fr 0.5fr">
      <TextInput
        value={payload.json1}
        setValue={(evt) => handleChangeText(evt, "json1")}
      />

      <TextInput
        value={payload.json2}
        setValue={(evt) => handleChangeText(evt, "json2")}
      />

      <Grid item xs={12}>
        <Button variant="contained" onClick={onClickCompareButton}>
          Contained
        </Button>
      </Grid>

      <SnackbarNotification
        open={snakbarOptions.isOpen}
        message={snakbarOptions.message}
        variant="error"
        onClose={handleCloseSnackbar}
        index={0}
      />
    </Grid>
  );
};

export default CompareJson;
