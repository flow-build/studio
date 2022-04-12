export function getLongFormatByDate(text: string) {
  try {
    const date = new Date(text);
    return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full' }).format(date)
  } catch (error) {
    throw new Error('Erro ao retornar data formatada');
  }
}