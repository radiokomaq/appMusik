import { createContext, useState } from "react";
import tracksList from "../assets/tracksList";
type AudiContextType = {
    handleToggleAudio: (track: any) => void; 
    NextTrack: (track: any) => void; 
    currentTrack: { id: number; src: string; preview: string; duration: number; title: string; artists: string};
    isPlaying:boolean;
    volume: number;
    audio:HTMLAudioElement 
  };

  const audio = new Audio();

  export const AudiContext = createContext<AudiContextType>({
    handleToggleAudio: () => {}, 
    NextTrack:() =>{},
    currentTrack: { id: 0, 
        src: "",
         preview: "", 
         duration: 0,
          title: "", 
          artists: "",
         },
    isPlaying:false,
    audio:audio,
    volume: audio.volume,
  });

const audioProvider = ({ children }: { children: React.ReactNode  }) => {
    const [currentTrack, setCurrentTrack] = useState(tracksList[0])
    const [check,setCheck] = useState(0)
    const [isPlaying, setPlaying] = useState<boolean>(false)
    const  [volume, setVolume] = useState(audio.volume)

    const handleToggleAudio = (track:any) =>{
            if((currentTrack.id !== track.id)||check===0){
                //console.log(volume);
                setVolume(audio.volume)
                setCurrentTrack(track)
                setPlaying(true)

                audio.src = track.src
                audio.currentTime=0;
                audio.volume= audio.volume;
                audio.play()
                setCheck(check+1)
                return
            }


        if(isPlaying){
      
            audio.pause()
            setPlaying(false)
        }else{
           
            audio.play()
            setPlaying(true)
        }
        
    }
    const NextTrack = (track:any) =>{
        if(track.id == tracksList.length){
            handleToggleAudio(tracksList[0])
        }else{
            handleToggleAudio(tracksList[track.id])
        }
    }

    const value = {audio, currentTrack, isPlaying, volume, handleToggleAudio, NextTrack}
    return <AudiContext.Provider value={value}>{children}</AudiContext.Provider>
}

export default audioProvider;