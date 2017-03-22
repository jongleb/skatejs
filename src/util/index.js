export const root = typeof window === 'undefined' ? global : window;

const { Object, MutationObserver } = root;
const { getOwnPropertyNames, getOwnPropertySymbols } = Object;

export function dashCase (str) {
  return str.split(/([A-Z])/).reduce((one, two, idx) => {
    const dash = !one || idx % 2 === 0 ? '' : '-';
    return `${one}${dash}${two.toLowerCase()}`;
  });
}

export function debounce (cbFunc) {
  let scheduled = false;
  let i = 0;
  let cbArgs = [];
  const elem = document.createElement('span');
  const observer = new MutationObserver(() => {
    cbFunc(...cbArgs);
    scheduled = false;
    cbArgs = null;
  });

  observer.observe(elem, { childList: true });

  return (...args) => {
    cbArgs = args;
    if (!scheduled) {
      scheduled = true;
      elem.textContent = `${i}`;
      i += 1;
    }
  };
}

export const empty = val => val == null;
export const { freeze } = Object;

export function keys (obj = {}) {
  const names = getOwnPropertyNames(obj);
  return getOwnPropertySymbols ? names.concat(getOwnPropertySymbols(obj)) : names;
}

export function sym () {
  return typeof Symbol === 'function' ? Symbol() : uniqueId();
}

export function uniqueId () {
  return 'xxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
