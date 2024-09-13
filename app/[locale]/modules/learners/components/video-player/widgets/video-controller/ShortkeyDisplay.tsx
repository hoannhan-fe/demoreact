import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/app/[locale]/shared/components';
import { BsKeyboard } from 'react-icons/bs';
import { CustomTable } from './CustomTable';
import { Tooltip } from 'react-tooltip';
import { getOS } from '../../../../utils';
import {
  ShortkeyListMac,
  ShortkeyListWindows,
} from '../../data/Shortkeys.data';

export const ShortkeyDisplay = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="absolute right-5">
          <BsKeyboard className="h-8 w-8 cursor-pointer" id="shortkey" />
          <Tooltip anchorSelect="#shortkey" place="bottom" className="z-50">
            Shortcuts
          </Tooltip>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md px-0">
        <CustomTable
          ShortkeyList={
            getOS() == 'macos' ? ShortkeyListMac : ShortkeyListWindows
          }
        />
      </DialogContent>
    </Dialog>
  );
};
