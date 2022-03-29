import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setNotification } from "features/notificationsSlice";
import { workflowService } from "services/workflowService";

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
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");

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

      if(!data.workflow_id) return

      navigate(`/diagram/${data.workflow_id}`)
      setSearchValue('')
    } catch (e) {
      console.error(
        `Components/SidebarSearch/HandleSearch => ${e.error}: ${e.message}`
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
            onChange={(event) => setSearchValue(event.target.value)}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            edge="end"
                            disabled={!searchValue}
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
