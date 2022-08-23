import * as S from "./styles";

type Props = {
  onClose:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
  open: boolean;
  onClick: () => void;
};

export const Modal: React.FC<Props> = ({ onClose, open, onClick }) => {
  return (
    <S.ProcessDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <S.TitleDialog id="customized-dialog-title">Novo Processo</S.TitleDialog>
      <S.Content>
        <S.JsonEditor />
      </S.Content>
      <S.Actions>
        <S.SaveButton onClick={onClick} title="Salvar">
          Salvar
        </S.SaveButton>
      </S.Actions>
    </S.ProcessDialog>
  );
};
