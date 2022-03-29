import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { setSearchProcessIdDialog, setSearchProcessIdDialogData } from "features/bpmnSlice";
import { setNotification } from "features/notificationsSlice";
import { workflowService } from "services/workflowService";

import { isUUID } from "utils/validations";

import {
    FormControl,
    TextField,
    InputAdornment,
    IconButton
} from '@mui/material'
import {
    SearchOutlined
} from '@mui/icons-material'

const SidebarSearch = () => {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [isValidProcessId, setIsValidProcessId] = useState(false)

  const handleSearch = async () => {
    if (!searchValue) return;

    try {
      const { data, error } = await dispatch(
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
    } catch (e) {
      console.error(
        `Components/SidebarSearch/HandleSearch => ${e.error}: ${e.message}`
      );
    }
  };

  const handleSearchValue = (event) => {
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

export default SidebarSearch;
