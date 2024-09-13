import { useEffect, useRef } from "react";

const formWaveSurferOptions = (ref) => ({
    container: ref,
    waveColor: "#BBD1EA",
    progressColor: "#507DBC",
    cursorColor: "#A1C6EA",
    barWidth: 4,
    barRadius: 3,
    responsive: true,
    height: 80,
    normalize: true,
    partialRender: true,
    xhr: {
      cache: "default",
      mode: "cors",
      method: "GET",
      credentials: "include",
      headers: [
        { key: 'Authorization', value: 'my-token' },
        { key: "cache-control", value: "no-cache" },
        { key: "pragma", value: "no-cache" }
      ]
    }
  });

export default function WaveSurferComp({urlAudio}) {
    const waveformRef = useRef(null);
    const wavesurfer = useRef(null);

    const url = urlAudio;

    useEffect(() => {
        create();
    
        return () => {
          if (wavesurfer.current) {
            wavesurfer.current.destroy();
          }
        };
    }, []);

    const create = async () => {
        const WaveSurfer = (await import("wavesurfer.js")).default;
    
        const options = formWaveSurferOptions(waveformRef.current);
        wavesurfer.current = WaveSurfer.create(options);
    
        wavesurfer.current.load(url);
    };

  return (
    <div className={` ${styles.flexBetween} flex-col w-full h-full`}>
        <div className='w-full h-1/2'>
            <div className='w-full h-[90%]'>
                {/* This is the boy here ===> */}
                <div id="waveform" ref={waveformRef} />
            </div>
            <div className={` flex justify-between items-center w-full `}>
                <p>00:01</p>
                <p>03:23</p>
            </div>
        </div>
    </div>
  );
}