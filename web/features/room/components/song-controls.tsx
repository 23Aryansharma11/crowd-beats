import { Button } from "@/components/ui/button";
import {
  ArrowRightCircle,
  PauseCircle,
  PlayCircle,
  PlusCircleIcon,
} from "lucide-react";

type TSongControlsProps = {
  currentPlayingSong: string;
  isPlaying: boolean;
  setCurrentPlayingSong: (songId: string) => void;
  setIsPlaying: (playing: boolean) => void;
};

export function SongControls({
  currentPlayingSong,
  isPlaying,
  setCurrentPlayingSong,
  setIsPlaying,
}: TSongControlsProps) {
  return (
    <div className="flex justify-center items-center gap-2 w-max h-max rounded-full md:rounded-2xl font-bold text-xl absolute bottom-0 left-10 z-20">
      <Button
        variant="secondary"
        className="flex justify-center items-center gap-2 w-10 h-10 md:w-40 p-2 rounded-full md:rounded font-bold text-xl"
      >
        {isPlaying ? (
          <PauseCircle className="size-8" />
        ) : (
          <PlayCircle className="size-8" />
        )}
        <span className="hidden md:block">
          {isPlaying ? "Pause song" : "Play song"}
        </span>
      </Button>
      <Button
        variant="ghost"
        className="flex justify-center items-center gap-2 w-10 h-10 md:w-40 p-2 rounded-full md:rounded font-bold text-xl"
      >
        <ArrowRightCircle className="size-8" />
        <span className="hidden md:block">Play Next</span>
      </Button>
    </div>
  );
}
