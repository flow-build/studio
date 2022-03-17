import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import _isUndefined from "lodash/isUndefined";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { setNotification } from "features/notificationsSlice";

import { useCompareJson } from "pages/CompareJson/hooks/useCompareJson";
import EmptyContent from "pages/CompareJson/components/EmptyContent/EmptyContent";

const CompareJson = () => {
  const dispatch = useDispatch();
  const { onCompare } = useCompareJson();

  const compare = useSelector((state) => state.compare);

  const compareDataTeste = useMemo(() => {
    if (_isUndefined(compare?.oldJson) || _isUndefined(compare?.newJson)) {
      return;
    }

    const { oldJson, newJson } = compare;

    const { data, isSuccess } = onCompare(oldJson, newJson);

    if (!isSuccess) {
      const notification = {
        type: "snackbar",
        variant: "error",
        message: data.message,
      };

      dispatch(setNotification(notification));

      return;
    }

    const { message, ...comparedValues } = data;

    return comparedValues;
  }, [dispatch, onCompare, compare]);

  if (_isUndefined(compareDataTeste)) {
    return <EmptyContent />;
  }

  return (
    <Grid container spacing={2} gridTemplateRows="1fr 0.5fr 1fr">
      <Grid item xs={12} flex={1}>
        <strong>Propriedades removidas:</strong>{" "}
        {compareDataTeste.removedElements}
        <br />
        <strong>Propriedades adicionadas:</strong>{" "}
        {compareDataTeste.addedElements}
        <br />
        <br />
        <strong>Tipos de valores alterados:</strong>
        <br />
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Propriedade</TableCell>
                <TableCell align="right">Antigo JSON</TableCell>
                <TableCell align="right">Novo JSON</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {compareDataTeste.differentValues.map((row, index) => (
                <TableRow
                  key={index.toString()}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.prop}
                  </TableCell>
                  <TableCell align="right">{row.json1}</TableCell>
                  <TableCell align="right">{row.json2}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default CompareJson;
