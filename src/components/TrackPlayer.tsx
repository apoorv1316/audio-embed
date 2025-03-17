import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import type { Track } from '../types';

interface TrackPlayerProps {
  track: Track;
  isPlaying: boolean;
  onPlayPause: (trackId: string) => void;
  index: number;
}

export default function TrackPlayer({ track, isPlaying, onPlayPause, index }: TrackPlayerProps) {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (waveformRef.current && isPlaying) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#8b8b8b',
        progressColor: '#f50',
        cursorColor: '#f50',
        barWidth: 2,
        barRadius: 2,
        cursorWidth: 1,
        height: 40,
        barGap: 1,
      });

      wavesurfer.current.load(track.url);

      return () => {
        wavesurfer.current?.destroy();
      };
    }
  }, [track.url, isPlaying]);

  useEffect(() => {
    if (wavesurfer.current) {
      if (isPlaying) {
        wavesurfer.current.play();
      } else {
        wavesurfer.current.pause();
      }
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    onPlayPause(track.id);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    wavesurfer.current?.setVolume(newVolume);
  };

  const toggleMute = () => {
    if (wavesurfer.current) {
      if (isMuted) {
        wavesurfer.current.setVolume(volume);
      } else {
        wavesurfer.current.setVolume(0);
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className={`bg-white border-b border-gray-100 transition-all duration-300 ease-in-out ${isPlaying ? 'py-4' : 'py-2'}`}>
      <div className="flex items-center gap-3">
        <span className="text-gray-400 text-sm w-6 text-right">{index + 1}</span>
        <button
          onClick={handlePlayPause}
          className={`p-2 rounded-full text-white transition-colors ${isPlaying ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-400 hover:bg-gray-500'}`}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <img
              src={track.artwork}
              alt={track.title}
              className={`object-cover rounded transition-all duration-300 ${isPlaying ? 'w-10 h-10' : 'w-8 h-8'}`}
            />
            <div>
              <h3 className="text-xs text-gray-500">{track.artist}</h3>
              <h2 className="text-sm font-medium">{track.title}</h2>
            </div>
          </div>
          
          {isPlaying && (
            <div className="flex items-center gap-2 mt-3">
              <div className="flex-1">
                <div ref={waveformRef} />
              </div>
              
              <div className="flex items-center gap-2 min-w-[100px]">
                <button
                  onClick={toggleMute}
                  className="text-gray-600 hover:text-gray-800"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}