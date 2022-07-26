import * as S from "./styles";

type Props = {
  title: string;
  copyValue: any;
  editorValue: any;
};

export const TableContent: React.FC<Props> = ({
  title,
  copyValue,
  editorValue,
}) => { 
  function onClickCopy() {
    navigator.clipboard.writeText(
      JSON.stringify(copyValue, null, "\t")
    );
  }
  return (
    <>
      <S.BoxTable>
        <S.TitleTable>{title}</S.TitleTable>
        <S.TooltipIcon title={"copiar"}>
          <S.CopyIcon
            onClick={onClickCopy}
          >
            <S.CopyOutlinedIcon />
          </S.CopyIcon>
        </S.TooltipIcon>
        <S.Table>
          <S.TableBody>
            <S.TableRow>
              <S.Editor value={JSON.stringify(editorValue, null, "\t")} />
            </S.TableRow>
          </S.TableBody>
        </S.Table>
      </S.BoxTable>
    </>
  );
};
