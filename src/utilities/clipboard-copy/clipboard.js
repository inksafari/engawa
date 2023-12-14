function createNode(text) {
  const node = document.createElement('pre');
  node.style.width = '1px';
  node.style.height = '1px';
  node.style.position = 'fixed';
  node.style.top = '5px';
  node.textContent = text;
  return node;
}

export function copyNode(node) {
  const clone = node.cloneNode(true);
  for (const ignorable of clone.querySelectorAll('[aria-hidden]'))
    ignorable.remove();
  if ('clipboard' in navigator) {
    return navigator.clipboard.writeText(clone.textContent || '');
  }

  const selection = getSelection();
  if (selection == null) {
    return Promise.reject(new Error());
  }

  selection.removeAllRanges();
  const range = document.createRange();
  range.selectNodeContents(clone);
  selection.addRange(range);
  document.execCommand('copy');
  selection.removeAllRanges();
  return Promise.resolve();
}

export function copyText(text) {
  if ('clipboard' in navigator) {
    return navigator.clipboard.writeText(text);
  }

  const { body } = document;
  if (!body) {
    return Promise.reject(new Error());
  }

  const node = createNode(text);
  body.append(node);
  copyNode(node);
  node.remove();
  return Promise.resolve();
}
