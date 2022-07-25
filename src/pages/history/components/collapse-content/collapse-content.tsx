import AceEditor from "react-ace/";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-dracula";

import _isEmpty from "lodash/isEmpty";

import { TState } from "models/state";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as S from "./styles";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { IconButton } from "shared/components/icon-button";

type Props = {
  state: TState;
};

export const CollapseContent: React.FC<Props> = ({ state }) => {
  function onClickCopyBag() {
    navigator.clipboard.writeText(JSON.stringify(state.bag, null, "\t"));
  }

  function onClickCopyResult() {
    navigator.clipboard.writeText(JSON.stringify(state.result, null, "\t"));
  }
  
  function onClickCopyActor() {
    navigator.clipboard.writeText(JSON.stringify(state.actor_data, null, "\t"));
  }

  if (_isEmpty(state.result)) {
    return (
      <Box sx={{ margin: 1 }}>
        <Typography variant="h6" component="p" gutterBottom>
          Result
        </Typography>
        <Typography variant="caption" component="p">
          No result data...
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          margin: 1,
          display: "inline-block",
          justifyContent: "space-around",
          width: 400,
          height: 400,
        }}
      >
        <Typography
          variant="h6"
          component="p"
          gutterBottom
          sx={{ display: "inline-block" }}
        >
          Bag
        </Typography>
        <IconButton
          icon={ContentCopyOutlinedIcon}
          onClick={onClickCopyBag}
          tooltip="copiar"
        ></IconButton>
        <S.Table size="small" aria-label="bag">
          <S.TableBody>
            <S.TableRow>
              <AceEditor
                name="Bag"
                value={JSON.stringify(state.bag, null, "\t")}
                mode="json"
                theme="solarized_dark"
                setOptions={{
                  overwrite: false,
                  showPrintMargin: false,
                  copyWithEmptySelection: true,
                }}
                height="400px"
                width="400px"
              />
            </S.TableRow>
          </S.TableBody>
        </S.Table>
      </Box>

      <Box
        sx={{
          margin: 5,
          ml: 10,
          mr: 10,
          display: "inline-block",
          justifyContent: "space-around",
          width: 400,
          height: 400,
        }}
      >
        <Typography
          variant="h6"
          component="p"
          gutterBottom
          sx={{ display: "inline-block" }}
        >
          Result
        </Typography>
        <IconButton
          icon={ContentCopyOutlinedIcon}
          onClick={onClickCopyResult}
          tooltip="copiar"
        ></IconButton>
        <S.Table size="small" aria-label="result">
          <S.TableBody>
            <S.TableRow>
              <AceEditor
                name="Result"
                value={JSON.stringify(state.result, null, "\t")}
                mode="json"
                theme="clouds_midnight"
                setOptions={{
                  overwrite: false,
                  showPrintMargin: false,
                  copyWithEmptySelection: true,
                }}
                height="400px"
                width="400px"
                readOnly
              />
            </S.TableRow>
          </S.TableBody>
        </S.Table>
      </Box>

      <Box
        sx={{
          margin: 1,
          display: "inline-block",
          justifyContent: "space-around",
          width: 400,
          height: 400,
        }}
      >
        <Typography
          variant="h6"
          component="p"
          gutterBottom
          sx={{ display: "inline-block" }}
        >
          Actor data
        </Typography>
        <IconButton
          icon={ContentCopyOutlinedIcon}
          onClick={onClickCopyActor}
          tooltip="copiar"
        ></IconButton>
        <S.Table size="small" aria-label="actor data">
          <S.TableBody sx={{ overflow: "scroll" }}>
            <S.TableRow>
              <AceEditor
                name="Actor Data"
                value={JSON.stringify(state?.actor_data, null, "\t")}
                mode="json"
                theme="dracula"
                setOptions={{
                  overwrite: false,
                  showPrintMargin: false,
                  copyWithEmptySelection: true,
                }}
                height="400px"
                width="400px"
                readOnly
              />
            </S.TableRow>
          </S.TableBody>
        </S.Table>
      </Box>
    </>
  );
};
