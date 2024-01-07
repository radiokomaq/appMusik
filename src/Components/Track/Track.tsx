import React from 'react';
import { IconButton } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import secondTOMMSS from '../../utils/secondTOMMSS';
import { useContext } from 'react';
import { AudiContext } from '../../context/AudioContext';
import PauseIcon from '@mui/icons-material/Pause';


type TrackProps = {
    track: {
        id: number;
        src: string;
        preview: string;
        duration: number;
        title: string;
        artists: string;
    };
};
type AudiContextType = {
    handleToggleAudio: (track: any) => void;
    NextTrack: (track: any) => void;
    
    currentTrack: {
        id: number;
        src: string;
        preview: string;
        duration: number;
        title: string;
        artists: string;
    };
    volume: number,
    isPlaying:boolean;
    audio:HTMLAudioElement 
};

const Track: React.FC<TrackProps> = ({ track }) => {


    const { handleToggleAudio, currentTrack,isPlaying } = useContext<AudiContextType>(AudiContext);

    const isCurrentTrack = currentTrack.id === track.id

    const formatedDuration = secondTOMMSS(track.duration);



    return (
        <div className={`${isCurrentTrack ? 'bg-[#9e9e9e] bg-opacity-30' : 'bg-none'}  flex w-full flex-col md:flex-row items-center  gap-4`} onClick={() => handleToggleAudio(track)}>
            <div className='w-full sm:w-[5%] flex items-center justify-center'>
                <IconButton >
                    {isCurrentTrack && isPlaying?
                        <PauseIcon
                            sx={{
                                fontSize: 30,
                                '@media (min-width: 768px)': {
                                    fontSize: 25,
                                },
                                '@media (min-width: 1030px)': {
                                    fontSize: 32,
                                },
                                '@media (min-width: 1535px)': {
                                    fontSize: 36,
                                },
                            }}
                        />
                        :
                        <PlayArrow sx={{
                            fontSize: 30,
                            '@media (min-width: 768px)': {
                                fontSize: 25,
                            },
                            '@media (min-width: 1030px)': {
                                fontSize: 32,
                            },
                            '@media (min-width: 1535px)': {
                                fontSize: 36,
                            },
                        }} />
                    }


                </IconButton>
            </div>
            <div className='w-full 2xl:w-[20%] flex items-center justify-center'>
                <img className='w-12 h-12 rounded-3xl' src={track.preview} alt='track' />
            </div>
            <div className='w-full flex  flex-col justify-center items-center md:items-start'>
                <b className='flex justify-start text-[8pt] 2xl:text-[12pt]'>{track.title}</b>
                <p className='flex justify-start text-[8pt] 2xl:text-[12pt]'>{track.artists}</p>
            </div>
            <div className='w-full flex justify-center md:justify-end items-center'>
                <p className='text-[8pt] 2xl:text-[12pt]'>{formatedDuration}</p>
            </div>
        </div>
    );
};

export default Track;



