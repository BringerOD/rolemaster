export function copyTextAreaToClipBoard(message: string) {
  const cleanText = message.replace(/<\/?[^>]+(>|$)/g, '');
  const x = document.createElement('TEXTAREA') as HTMLTextAreaElement;
  x.value = cleanText;
  document.body.appendChild(x);
  x.select();
  document.execCommand('copy');
  document.body.removeChild(x);
}
