import { format } from "date-fns";
import ptBRLocale from "date-fns/locale/pt-BR";

export function getDateTimeFormatByDate(text: string) {
  try {
    const date = new Date(text);
    const maskDateTime = format(date, "dd/MMM/yyyy HH:mm:ss");
    return maskDateTime;
  } catch (error) {
    throw new Error("Erro ao retornar data formatada");
  }
}

export function getLongFormatByDate(text: string) {
  try {
    const date = new Date(text);
    return new Intl.DateTimeFormat("pt-BR", { dateStyle: "full" }).format(date);
  } catch (error) {
    throw new Error("Erro ao retornar data formatada");
  }
}

export function getShortFormatByDate(text: string) {
  try {
    const date = new Date(text);
    const maskDate = format(date, "dd/MMM/yyyy", { locale: ptBRLocale });
    return maskDate;
  } catch (error) {
    throw new Error("Erro ao retornar data formatada");
  }
}
