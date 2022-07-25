import AceEditor from "react-ace/";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-dracula";

import _isEmpty from "lodash/isEmpty";

import { TState } from "models/state";

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
      <S.BoxTable>
        <S.TitleTable>Result</S.TitleTable>
        <S.TextTable variant="caption" component="p">
          No result data...
        </S.TextTable>
      </S.BoxTable>
    );
  }

  return (
    <>
      <S.BoxTable>
        <S.TitleTable>Bag</S.TitleTable>
        <IconButton
          icon={ContentCopyOutlinedIcon}
          onClick={onClickCopyBag}
          tooltip="copiar"
        ></IconButton>
        <S.Table aria-label="bag">
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
                readOnly
              />
            </S.TableRow>
          </S.TableBody>
        </S.Table>
      </S.BoxTable>

      <S.BoxTable>
        <S.TitleTable>Result</S.TitleTable>
        <IconButton
          icon={ContentCopyOutlinedIcon}
          onClick={onClickCopyResult}
          tooltip="copiar"
        ></IconButton>
        <S.Table aria-label="result">
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
      </S.BoxTable>

      <S.BoxTable>
        <S.TitleTable>Actor data</S.TitleTable>
        <IconButton
          icon={ContentCopyOutlinedIcon}
          onClick={onClickCopyActor}
          tooltip="copiar"
        ></IconButton>
        <S.Table aria-label="actor data">
          <S.TableBody>
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
      </S.BoxTable>
    </>
  );
};
