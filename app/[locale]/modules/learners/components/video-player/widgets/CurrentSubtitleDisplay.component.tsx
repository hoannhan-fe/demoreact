import { Skeleton } from '@/app/[locale]/shared/components';
import { ConvertedSub } from '../../../types';
import SubtitleSentence from './subtitle/SubtitleSentence.component';

export const CurrentSubtitleDisplay = ({
  sub,
  disabled,
}: {
  sub: ConvertedSub;
  disabled: boolean;
}) => {
  return (
    <div className="relative bg-[#46A0F836] shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)] w-full min-h-[100px] rounded-lg flex justify-center items-center text-white font-normal py-2 px-6">
      {disabled ? (
        <p className="text-[#a8a8a8]">Subtitles Turned Off</p>
      ) : (
        <>
          <div className="leading-6 text-center grow">
            {sub && sub.text && sub.text.length > 0 ? (
              <SubtitleSentence words={sub.text} />
            ) : (
              <div className="flex flex-col items-center space-y-2 ">
                <Skeleton className="w-full h-6 bg-[#519de936]" />
                <Skeleton className="w-10/12 h-6 bg-[#519de936]" />
              </div>
            )}
          </div>
          {/* <Dialog>
            <DialogTrigger asChild>
              {subList && (
                <div className="w-fit ml-5">
                  <BsJournalText className="h-6 w-6 cursor-pointer" />
                </div>
              )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md px-0">
              <DialogHeader className="sm:text-center">
                <DialogTitle>Subtitle List</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col h-fit max-h-[300px] overflow-auto pl-6 pr-2">
                {subList &&
                  subList.map((sub: Sub, idx: number) => (
                    <span
                      className={`border-b ${idx <= subIdx ? 'py-2' : 'text-zinc-400 text-sm py-4'}`}
                      key={idx}
                    >
                      {idx <= subIdx ? sub.text : '(hidden)'}
                    </span>
                  ))}
              </div>
              <DialogFooter></DialogFooter>
            </DialogContent>
          </Dialog> */}
        </>
      )}
    </div>
  );
};
