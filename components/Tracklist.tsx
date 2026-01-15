import { Track } from '@/lib/tracks'

interface TracklistProps {
  tracks: Track[]
  title?: string
  maxHeight?: string
}

export default function Tracklist({
  tracks,
  title = 'Tracklist',
  maxHeight = 'max-h-52',
}: TracklistProps) {
  return (
    <div className="flex flex-col rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <h3 className="mb-4 text-lg font-bold tracking-wider text-white uppercase">
        {title}
      </h3>
      <div
        className={`custom-scrollbar ${maxHeight} space-y-2.5 overflow-y-auto pr-2`}
      >
        {tracks.map((track, index) => (
          <div
            key={index}
            className="group space-y-1 border-l-2 border-white/10 pl-3 transition-all hover:border-white/40"
          >
            <div className="text-xs text-white/40">{track.time}</div>
            <div className="text-sm font-medium text-white">{track.title}</div>
            <div className="text-xs text-white/60">{track.artist}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
