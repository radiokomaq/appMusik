import  { useContext, useEffect, useState } from 'react'
import { AudiContext } from '../../context/AudioContext'
import { Slider } from "@mui/material"
import PauseIcon from '@mui/icons-material/Pause';
import { IconButton } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import secondTOMMSS from '../../utils/secondTOMMSS';

type AudiContextType = {
    handleToggleAudio: (track: any) => void;
    currentTrack: {
        id: number;
        src: string;
        preview: string;
        duration: number;
        title: string;
        artists: string;
    };
    isPlaying: boolean,
    audio: HTMLAudioElement
};

const TimeControls = () => {
    const { audio, currentTrack } = useContext<AudiContextType>(AudiContext)
    const { duration } = currentTrack

    const [currentTime, setCurrentTime] = useState(0)
    const handleChengeCurrentTime = (_: Event, value: number) => {
        const time = Math.round((value / 100) * duration)
        setCurrentTime(time)
        audio.currentTime = time
    }
    const formattedCurrentTime = secondTOMMSS(currentTime)

    const sliderCurrentTime = Math.round((currentTime / duration) * 100)
    useEffect(() => {
        const timeInterval = setInterval(() => {
            setCurrentTime(audio.currentTime)
        }, 1000)
        return () => {
            clearInterval(timeInterval)
        }
    }, [])


    return (
        <>
            <p>{formattedCurrentTime}</p>
            <Slider step={0.01} min={0} max={100} value={sliderCurrentTime}   onChange={handleChengeCurrentTime as (event: Event, value: number | number[]) => void}
                sx={{
                    color: 'white',
                    height: '7px',
                    '@media (min-width: 768px)': {
                        height: '18px',
                    },
                    '& .MuiSlider-thumb': {
                        width: '10px',
                        height: '10px',
                        '@media (min-width: 768px)': {
                            width: '28px',
                            height: '28px',
                        },
                    },
                }}
            />
        </>
    )
}

const PlayBar = () => {
    const { currentTrack, handleToggleAudio, isPlaying } = useContext<AudiContextType>(AudiContext)
    const { title, artists, preview, duration } = currentTrack
    const formatedDuration = secondTOMMSS(duration)





    return (
        <div className='fixed w-full bottom-0 p-4 flex justify-center items-end bg-purple-700 max-h-[90px] md:max-h-[150px]'>
            <div className='flex flex-row gap-1 md:gap-4 items-center w-full 2xl:w-[70%] md:justify-center justify-start'>
                <img className=' w-12 h-12 md:w-16 md:h-16' src={preview} alt='logo' />
                <IconButton className='' onClick={() => handleToggleAudio(currentTrack)}>
                    {isPlaying ?
                        <PauseIcon
                            sx={{
                                color: 'white',
                                fontSize: 20,
                                '@media (min-width: 768px)': {
                                    fontSize: 25,
                                },
                                '@media (min-width: 1030px)': {
                                    fontSize: 32,
                                },
                                '@media (min-width: 1535px)': {
                                    fontSize: 50,
                                },
                            }}

                        /> :
                        <PlayArrow
                            sx={{
                                color: 'white',
                                fontSize: 20,
                                '@media (min-width: 768px)': {
                                    fontSize: 25,
                                },
                                '@media (min-width: 1030px)': {
                                    fontSize: 32,
                                },
                                '@media (min-width: 1535px)': {
                                    fontSize: 50,
                                },
                            }}

                        />
                    }
                </IconButton>
                <div className='flex w-[15%] items-center justify-center flex-col text-[white] text-[6pt] md:text-[8pt] lg:text-[10pt] xl:text-[11pt] 2xl:text-[14pt] overflow-y-hidden max-h-[90px] md:max-h-[150px]'>
                    <h4>{title} </h4>
                    <p>{artists}</p>
                </div>
                <div className='w-full flex flex-row gap-4 items-center text-[white] lg:text-[10pt] xl:text-[12pt] 2xl:text-[14pt] text-[9pt] justify-center'>
                    <TimeControls />
                    <p >{formatedDuration}</p>
                </div>
            </div>
        </div>
    )
}

export default PlayBar


