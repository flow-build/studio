export const urlHasProtocolHttp = (text: string) => {
    const protocol = '^(https?:\\/\\/)';
    const pattern = new RegExp(protocol, 'i');
    return pattern.test(text);
};

export const urlHasProtocolWs = (text: string) => {
    const protocol = '^(ws?:\\/\\/)';
    const pattern = new RegExp(protocol, 'i');
    return pattern.test(text);
};

export const removeProtocolHttps= (text: string) => {
    const protocol = '^(https?:\\/\\/)';
    const pattern = new RegExp(protocol, 'i');
    return text.replace(pattern, '');
  }

  export const removeProtocolWs= (text: string) => {
    const protocol = '^(ws?:\\/\\/)';
    const pattern = new RegExp(protocol, 'i');
    return text.replace(pattern, '');
  }