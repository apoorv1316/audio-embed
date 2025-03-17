import React, { useState } from 'react';
import TrackPlayer from './components/TrackPlayer';
import type { Track } from './types';

const tracks: Track[] = [
  {
    id: '1',
    title: 'Demo Track 1',
    artist: 'Artist 1',
    url: 'https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3',
    artwork: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop'
  },
  {
    id: '2',
    title: 'Demo Track 2',
    artist: 'Artist 2',
    url: 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3',
    artwork: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop'
  }
];

function App() {
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);

  const handlePlayPause = (trackId: string) => {
    setPlayingTrackId(playingTrackId === trackId ? null : trackId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h1 className="text-xl font-bold">Playlist Title</h1>
          </div>
          <div>
            {tracks.map((track, index) => (
              <TrackPlayer
                key={track.id}
                track={track}
                isPlaying={playingTrackId === track.id}
                onPlayPause={handlePlayPause}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;