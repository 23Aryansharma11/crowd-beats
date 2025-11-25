import { ScrollArea } from "@/components/ui/scroll-area";
import { TSong } from "@/lib/types";
import { User } from "better-auth";
import { HeartIcon, HeartPulseIcon } from "lucide-react";

export function SongQueue({ queue, user }: { queue: TSong[]; user: User }) {
  return (
    <div className="h-full w-full flex-1 overflow-x-hidden overflow-y-auto custom-scrollbar py-4">
      {queue.map((song) => {
        let likedByMe = false;
        if (song.upvotedBy && song.upvotedBy.includes(user.id))
          likedByMe = true;

        return (
          <div
            key={song.id}
            className="mb-4 flex items-center gap-4 hover:bg-accent hover:cursor-pointer p-2"
          >
            <img
              src={song.data.image}
              alt={song.data.title}
              className="w-30 aspect-video object-cover rounded object-center"
            />
            <div>
              <p className="font-semibold line-clamp-2">{song.data.title}</p>
              <p className="text-sm font-extralight line-clamp-1 text-gray-700 dark:text-gray-400">
                {song.data.description}
              </p>
              <div className="flex justify-between items-center px-4">
                <p className="text-xs text-gray-600">
                  {song.authorId === user.id ? "You" : song.author}
                </p>
                <p className="flex justify-center items-center gap-4">
                  {likedByMe ? (
                    <HeartIcon
                      className="text-red-500 fill-red-500"
                      size={20}
                    />
                  ) : (
                    <HeartIcon className="" size={20} />
                  )}
                  {song.upvotes || 0}
                  {likedByMe}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
