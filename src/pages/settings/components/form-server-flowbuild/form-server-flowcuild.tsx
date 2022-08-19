/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState } from "react";
import { healthcheck } from "services/resources/settings";
import * as S from "./styles";

import { useDispatch, useSelector } from "react-redux";
import { setFlowbuildHost, setFlowbuildPort } from "store/slices/settings";
import { RootState } from "store";

// MODAL
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//MODAL

interface IPayload {
  serverUrl: string;
  serverPort: string;
}

export const FormServerFlowbuild: React.FC<{}> = () => {
  const [formSettingsData, setFormSettingsData] = useState<IPayload>({
    serverUrl: "",
    serverPort: "",
  });
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.settings);
  console.log("store", store);

  function onChangeState(value: string, field: keyof IPayload) {
    setFormSettingsData((state) => ({ ...state, [field]: value }));
  }

  function saveSettings() {
    dispatch(setFlowbuildHost(formSettingsData.serverUrl));
    dispatch(setFlowbuildPort(formSettingsData.serverPort));
  }

  const [formServer, setFormServer] = useState<any>(null);

  const handleSubmit = async (
    e: any,
    type: string,
    message: string,
    url: string,
    port: string
  ) => {
    try {
      e.preventDefault();
      const response = await healthcheck(url, port);

      type === "server" && setFormServer(true);
      message === "status" && setFormServer(true);
      if (response?.mqtt?.status) {
        saveSettings();
      }
      console.log("response", response);
    } catch (error: any) {
      type === "server" && setFormServer(false);
      message === "status" && setFormServer(false);
      console.error(error);
    }
  };

  function checkDisabledFormServer() {
    if (formSettingsData.serverUrl !== "" && formSettingsData.serverPort !== "")
      return false;
    else {
      return true;
    }
  }

  // MODAL

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const statusNotify = async (
    e: any,
    type: string,
    message: string,
    url: string,
    port: string
  ) => {
    try {
      e.preventDefault();
      const response = await healthcheck(url, port);
      type === "server" && setFormServer(true);
      message === "status" && setFormServer(true);
      response;
    } catch (error: any) {
      type === "server" && setFormServer(false);
      message === "status" && setFormServer(false);
      console.error(error);
    }
  };
  return (
    <div>
      {/* //MODAL */}
      <S.ModalContent>
        {/* <S.ButtonModal onClick={handleClickOpen}>
          Confirme os dados
        </S.ButtonModal> */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>{"Confirme os dados"}</DialogTitle>
          <DialogContent>
            {}
            <DialogContentText>
              <S.FlowbuildData>
                <S.ParagraphModal>
                  URL do servidor do Flowbuild: {store.REACT_APP_FLOWBUILD_HOST}
                </S.ParagraphModal>
                <S.ParagraphModal>
                  Porta do Flowbuild: {store.REACT_APP_FLOWBUILD__PORT}
                </S.ParagraphModal>
              </S.FlowbuildData>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              // onClick={handleClose}
              autoFocus
              // disabled={checkDisabledConfirm()}
              onClick={(e) => {
                handleClose();
                handleSubmit(
                  e,
                  "server",
                  "status",
                  formSettingsData.serverUrl,
                  formSettingsData.serverPort
                );
              }}
            >
              Enviar
            </Button>
          </DialogActions>
        </Dialog>
      </S.ModalContent>
      {/* // MODAL */}
      <S.FormServer
      // onSubmit={(e) => {
      //   handleSubmit(
      //     e,
      //     "server",
      //     "status",
      //     formSettingsData.serverUrl,
      //     formSettingsData.serverPort
      //   );
      // }}
      >
        <S.ContainerServer>
          <S.InputServerURL
            value={formSettingsData.serverUrl}
            onChange={(e) => onChangeState(e.target.value, "serverUrl")}
          />

          <S.InputServerPort
            value={formSettingsData.serverPort}
            onChange={(e) => onChangeState(e.target.value, "serverPort")}
          />

          <S.SubmitButton
            // type="submit"
            disabled={checkDisabledFormServer()}
            // onClick={handleClickOpen}

            onClick={(e) => {
              handleClickOpen();
              statusNotify(
                e,
                "server",
                "status",
                formSettingsData.serverUrl,
                formSettingsData.serverPort
              );
            }}
          >
            Enviar
          </S.SubmitButton>

          {formServer !== null &&
            (formServer ? (
              <>
                <S.IconSuccess />
                <S.Paragraph>Sucesso ao conectar</S.Paragraph>
              </>
            ) : (
              <>
                <S.IconError />
                <S.Paragraph>Erro ao conectar</S.Paragraph>
              </>
            ))}
        </S.ContainerServer>
      </S.FormServer>
    </div>
  );
};

// import { useState } from "react";
// import { healthcheck } from "services/resources/settings";
// import * as S from "./styles";

// import { useDispatch, useSelector } from "react-redux";
// import { setFlowbuildHost, setFlowbuildPort } from "store/slices/settings";
// import { RootState } from "store";

// interface IPayload {
//   serverUrl: string;
//   serverPort: string;
// }

// export const FormServerFlowbuild: React.FC<{}> = () => {
//   const [formSettingsData, setFormSettingsData] = useState<IPayload>({
//     serverUrl: "",
//     serverPort: "",
//   });
//   const dispatch = useDispatch();
//   const store = useSelector((state: RootState) => state.settings);
//   console.log("store", store);

//   function onChangeState(value: string, field: keyof IPayload) {
//     setFormSettingsData((state) => ({ ...state, [field]: value }));
//   }

//   function saveSettings() {
//     dispatch(setFlowbuildHost(formSettingsData.serverUrl));
//     dispatch(setFlowbuildPort(formSettingsData.serverPort));
//   }

//   const [formServer, setFormServer] = useState<any>(null);

//   const handleSubmit = async (
//     e: any,
//     type: string,
//     message: string,
//     url: string,
//     port: string
//   ) => {
//     try {
//       e.preventDefault();
//       const response = await healthcheck(url, port);

//       type === "server" && setFormServer(true);
//       message === "status" && setFormServer(true);
//       if (response?.mqtt?.status) {
//         saveSettings();
//       }
//       console.log("response", response);
//     } catch (error: any) {
//       type === "server" && setFormServer(false);
//       message === "status" && setFormServer(false);
//       console.error(error);
//     }
//   };

//   function checkDisabledFormServer() {
//     if (formSettingsData.serverUrl !== "" && formSettingsData.serverPort !== "")
//       return false;
//     else {
//       return true;
//     }
//   }

//   return (
//     <S.FormServer
//       onSubmit={(e) => {
//         handleSubmit(
//           e,
//           "server",
//           "status",
//           formSettingsData.serverUrl,
//           formSettingsData.serverPort
//         );
//       }}
//     >
//       <S.ContainerServer>
//         <S.InputServerURL
//           value={formSettingsData.serverUrl}
//           onChange={(e) => onChangeState(e.target.value, "serverUrl")}
//         />

//         <S.InputServerPort
//           value={formSettingsData.serverPort}
//           onChange={(e) => onChangeState(e.target.value, "serverPort")}
//         />

//         <S.SubmitButton type="submit" disabled={checkDisabledFormServer()}>
//           Enviar
//         </S.SubmitButton>

//         {formServer !== null &&
//           (formServer ? (
//             <>
//               <S.IconSuccess />
//               <S.Paragraph>Sucesso ao conectar</S.Paragraph>
//             </>
//           ) : (
//             <>
//               <S.IconError />
//               <S.Paragraph>Erro ao conectar</S.Paragraph>
//             </>
//           ))}
//       </S.ContainerServer>
//     </S.FormServer>
//   );
// };
