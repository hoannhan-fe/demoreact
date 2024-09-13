import { Sub } from '../types';
import { getOS } from './check-os.utils';
import {
  handleSpaceKey,
  handleArrowRightKey,
  handleArrowLeftKey,
} from './keyboard.utils';
import ReactPlayer from 'react-player';

interface HandleKeyDownParams {
  event: KeyboardEvent;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setSubIdx: React.Dispatch<React.SetStateAction<number>>;
  listSubtitles: Sub[];
  playerRef: React.RefObject<ReactPlayer>;
}

const handleKeyDown = ({
  event,
  setPlaying,
  setSubIdx,
  listSubtitles,
  playerRef,
}: HandleKeyDownParams) => {
  // const isInputFocused =
  //   document.activeElement instanceof HTMLInputElement ||
  //   document.activeElement instanceof HTMLTextAreaElement;
  // if (!isInputFocused) {
  if (getOS() == 'macos') {
    if (event.code === 'Digit1' && event.ctrlKey) {
      event.preventDefault();
      handleSpaceKey(setPlaying);
      return;
    }

    if (event.code === 'Digit2' && event.ctrlKey) {
      event.preventDefault();
      handleArrowRightKey(setSubIdx, listSubtitles, playerRef);
      return;
    }

    if (event.code === 'Digit3' && event.ctrlKey) {
      event.preventDefault();
      handleArrowLeftKey(setSubIdx, listSubtitles, playerRef);
      return;
    }
  } else {
    if (event.code === 'Digit1' && event.altKey) {
      event.preventDefault();
      handleSpaceKey(setPlaying);
      return;
    }

    if (event.code === 'Digit2' && event.altKey) {
      event.preventDefault();
      handleArrowRightKey(setSubIdx, listSubtitles, playerRef);
      return;
    }

    if (event.code === 'Digit3' && event.altKey) {
      event.preventDefault();
      handleArrowLeftKey(setSubIdx, listSubtitles, playerRef);
      return;
    }
  }
};

export default handleKeyDown;
