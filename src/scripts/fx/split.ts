/** Découpe le texte d'un élément en mots/lettres (en préservant <em> etc.) pour l'animer. */
export function splitChars(el: HTMLElement): HTMLElement[] {
  const label = el.textContent?.trim() ?? '';
  const chars: HTMLElement[] = [];
  const walk = (node: Node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        (child.textContent ?? '').split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
          const word = document.createElement('span');
          word.className = 'word';
          word.setAttribute('aria-hidden', 'true');
          [...part].forEach((ch) => {
            const s = document.createElement('span');
            s.className = 'char';
            s.textContent = ch;
            word.appendChild(s);
            chars.push(s);
          });
          frag.appendChild(word);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
      }
    });
  };
  walk(el);
  el.setAttribute('aria-label', label);
  return chars;
}
