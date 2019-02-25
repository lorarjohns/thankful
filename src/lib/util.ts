let browser;
if (typeof chrome !== 'undefined') {
  browser = require('webextension-polyfill');
}

export function isNode(): boolean {
  // TODO: Test in browser
  return typeof process !== 'undefined';
}

export function isWebExtension(): boolean {
  // TODO: Test in Chrome, Firefox, and in-page
  return !!(window && window.chrome && browser.runtime && browser.runtime.id);
}

export function isBackgroundPage(): boolean {
  // TODO: Test
  return isWebExtension() && chrome.extension.getBackgroundPage() === window;
}

export function isTesting() {
  return process.env.JEST_WORKER_ID !== undefined;
}

// TODO: Does this actually return a date? Or sometimes a string?
export async function getInstallDate(): Promise<Date> {
  const installDate = (await browser.storage.local.get('installDate'))
    .installDate;

  if (installDate === undefined) {
    const now = new Date();
    browser.storage.local.set({ installDate: now });
    return now;
  } else {
    return installDate;
  }
}
