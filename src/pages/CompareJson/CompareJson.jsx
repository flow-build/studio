import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import _isEmpty from "lodash/isEmpty";

import { setNotification } from "features/notificationsSlice";

import { TextInput } from "pages/CompareJson/components/TextInput";
import { useCompareJson } from "pages/CompareJson/hooks/useCompareJson";

const CompareJson = () => {
  const dispatch = useDispatch();
  const { onCompare } = useCompareJson();

  const [payload, setPayload] = useState({ json1: "", json2: "" });

  const handleChangeText = (event, field) => {
    setPayload((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const onClickCompareButton = () => {
    const { data, isSuccess } = onCompare(payload.json1, payload.json2);

    if (!isSuccess) {
      return dispatch(
        setNotification({
          type: "snackbar",
          variant: "error",
          message: data.message,
        })
      );
    }

    console.log({
      "Propriedades removidas": data.removedElements ?? [],
      "Propriedades adicionadas": data.addedElements ?? [],
    });

    if (_isEmpty(data.differentValues)) {
      console.log("Nenhum tipo de valor diferente.");
    } else {
      console.table(data.differentValues);
    }
    return;
  };

  return (
    <Grid container spacing={2} height="100%" gridTemplateRows="1fr 0.5fr">
      <TextInput
        value={payload.json1}
        setValue={(evt) => handleChangeText(evt, "json1")}
        label="Antigo JSON"
      />

      <TextInput
        value={payload.json2}
        setValue={(evt) => handleChangeText(evt, "json2")}
        label="Novo JSON"
      />

      <Grid item xs={12}>
        <Button variant="contained" onClick={onClickCompareButton}>
          Contained
        </Button>
      </Grid>
    </Grid>
  );
};

export default CompareJson;
