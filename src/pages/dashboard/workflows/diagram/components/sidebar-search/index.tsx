import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { setSearchProcessIdDialog, setSearchProcessIdDialogData } from "pages/dashboard/workflows/diagram/features/bpmnSlice";
import { setNotification } from "pages/dashboard/workflows/diagram/features/notificationsSlice";
import { workflowService } from "pages/dashboard/workflows/diagram/services/workflowService";

/* TODO: Trocar pela lib uuid */
import { isUUID } from "pages/dashboard/workflows/diagram/utils/validations";

import {
  FormControl,
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material'
import {
  SearchOutlined
} from '@mui/icons-material'

export const SidebarSearch: React.FC<any> = () => {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [isValidProcessId, setIsValidProcessId] = useState(false)

  const handleSearch = async () => {
    if (!searchValue) return;

    try {
      const { data, error } = await dispatch<any>(
        workflowService.endpoints.getProcessStateById.initiate(searchValue)
      );

      if (error?.status) {
        dispatch(
          setNotification({
            type: "snackbar",
            variant: "error",
            message: `Não foi possivel encontrar o processo para ${searchValue}`,
          })
        );

        return;
      }

      dispatch(setSearchProcessIdDialogData(data))
      dispatch(setSearchProcessIdDialog(true))
      setSearchValue("")
    } catch (e: any) {
      console.error(
        `Components/SidebarSearch/HandleSearch => ${e.error}: ${e.message}`
      );
    }
  };

  const handleSearchValue = (event: any) => {
    setSearchValue(event.target.value);
    if (isUUID(event.target.value)) {
      setIsValidProcessId(true);
    } else {
      setIsValidProcessId(false);
      dispatch(
        setNotification({
          type: "snackbar",
          variant: "error",
          message: "UUID inválido.",
        })
      );
    }
  };

  return (
    <FormControl variant="standard">
      <TextField
        id="sidebar_search"
        type="text"
        size="small"
        label="Process ID"
        value={searchValue}
        onChange={handleSearchValue}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                disabled={!isValidProcessId}
                onClick={handleSearch}
              >
                <SearchOutlined />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </FormControl>
  );
};

