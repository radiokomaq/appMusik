import { createContext, useState } from "react";
import tracksList from "../assets/tracksList";
type AudiContextType = {
    handleToggleAudio: (track: any) => void; 
    currentTrack: { id: number; src: string; preview: string; duration: number; title: string; artists: string };
    isPlaying:boolean;
    audio:HTMLAudioElement 
  };

  const audio = new Audio();

  export const AudiContext = createContext<AudiContextType>({
    handleToggleAudio: (track) => {}, 
    currentTrack: { id: 0, 
        src: "",
         preview: "", 
         duration: 0,
          title: "", 
          artists: "" },
    isPlaying:false,
    audio:audio
  });

const audioProvider = ({ children }: { children: React.ReactNode  }) => {
    const [currentTrack, setCurrentTrack] = useState(tracksList[0])
    const [check,setCheck] = useState(0)
    const [isPlaying, setPlaying] = useState<boolean>(false)

    const handleToggleAudio = (track:any) =>{
            if((currentTrack.id !== track.id)||check===0){
                setCurrentTrack(track)
                setPlaying(true)

                audio.src = track.src
                audio.currentTime=0;
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
    const value = {audio, currentTrack, isPlaying,handleToggleAudio}
    return <AudiContext.Provider value={value}>{children}</AudiContext.Provider>
}

export default audioProvider;