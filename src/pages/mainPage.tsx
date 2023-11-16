import { FC, useState } from 'react';
import tracksList from '../assets/tracksList';
import Track from '../Components/Track/Track';
import { Input } from "@mui/material"

const MainPage: FC = () => {

  const [tracks, setTracks] = useState(tracksList)

  const runSearch = (query:string) =>{
    if(!query)
    return tracksList;
  const lowerCaseQuery = query.toLowerCase()
  return tracksList.filter((tracks) => 
  tracks.title.toLocaleLowerCase().includes(lowerCaseQuery) ||
  tracks.artists.toLocaleLowerCase().includes(lowerCaseQuery)
  
  )
  }

  const handleChange = (event: string) => {
    const foundTracks = runSearch(event)
    setTracks(foundTracks)
    console.log(event);

  }

  return (
    <div className='w-full h-full flex flex-col items-center justify-center '>
      <Input sx={{
        width: '300px',
        margin: '10px 150px',
        '& > *': {
          textAlign: 'center',
          color: '#9e9e9e',
          padding: '14px',
          fontSize: '18px',
        },
      }}
        placeholder='Поиск трека'
        onChange={(event) => handleChange(event.target.value)}
      />
      <div className='grid max-h-[calc(100vh-195px)] w-[50%] md:w-[30%] px-3 py-4 overflow-auto  gap-4 border-2 border-[#eee] rounded-3xl'>
        {tracks.map((track) => (
          <Track key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
}

export default MainPage;
