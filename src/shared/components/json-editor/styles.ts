import styled from "styled-components";

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-dracula";

export const Wrapper = styled(AceEditor).attrs({
  placeholder: "Digite o json",
  mode: "json",
  theme: "dracula",
  name: "custom:parameters",
  width: "100%",
  fontSize: 12,
})``;
