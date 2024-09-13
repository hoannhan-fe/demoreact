export interface Shortkey {
  shortcut: string;
  function: string;
}

export const ShortkeyListWindows: Shortkey[] = [
  {
    shortcut: 'Alt + 1',
    function: 'Pause/Play video',
  },
  {
    shortcut: 'Alt + 2',
    function: 'Next subtitle',
  },
  {
    shortcut: 'Alt + 3',
    function: 'Previous subtitle',
  },
];
export const ShortkeyListMac: Shortkey[] = [
  {
    shortcut: 'Control + 1',
    function: 'Pause/Play video',
  },
  {
    shortcut: 'Control + 2',
    function: 'Next subtitle',
  },
  {
    shortcut: 'Control + 3',
    function: 'Previous subtitle',
  },
];
