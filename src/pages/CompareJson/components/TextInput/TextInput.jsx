import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const TextInput = ({ value, setValue, label }) => {
  return (
    <Grid item xs={6} flex={1}>
      <TextField
        id="outlined-multiline-flexible"
        label={label ?? ""}
        multiline
        maxRows={13}
        fullWidth
        value={value}
        onChange={setValue}
        style={{ height: "100px" }}
      />
    </Grid>
  );
};

export default TextInput;
