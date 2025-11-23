"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircleIcon, Loader2 } from "lucide-react";
import { backendUrl } from "@/lib/backend";
import { Spinner } from "@/components/ui/spinner";

export function AddSongButton() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [videos, setVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Trigger search when debouncedSearchTerm changes
  useEffect(() => {
    if (!debouncedSearchTerm) {
      setVideos([]);
      setError(null);
      return;
    }
    const fetchVideos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          backendUrl + `/api/search/yt/${searchTerm}`
        );
        const res = await response.json();
        setVideos(res.data || []);
      } catch {
        setError("Something went wrong while fetching videos.");
        setVideos([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, [debouncedSearchTerm]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="default"
          className="flex justify-center items-center gap-2 w-max h-max rounded-full md:rounded-2xl font-bold text-xl absolute bottom-0 right-10 z-20"
        >
          <PlusCircleIcon className="size-8" />
          <span className="hidden md:block">Add song</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm md:max-w-2xl">
          <DrawerHeader>
            <DrawerTitle className="text-2xl md:text-4xl font-bold">
              Add Song
            </DrawerTitle>
            <DrawerDescription className="text-sm md:text-xl">
              Search for your favourite song
            </DrawerDescription>
          </DrawerHeader>
          <div className="w-full flex flex-col h-full gap-8">
            <div className="flex gap-2">
              <Input
                placeholder="Search your favourite song"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                onClick={() => setDebouncedSearchTerm(searchTerm.trim())}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Searching...
                  </span>
                ) : (
                  "Search"
                )}
              </Button>
            </div>

            {error && (
              <div className="text-sm text-muted-foreground flex justify-center items-center h-96 w-full">
                {error}
              </div>
            )}

            <ScrollArea className="h-96 w-full rounded-md border p-4 overflow-hidden flex justify-center items-center">
              {isLoading && (
                <div className="text-sm text-muted-foreground flex justify-center items-center h-96 w-full">
                  <Spinner />
                </div>
              )}

              {!isLoading && videos.length === 0 && !error && (
                <div className="text-sm text-muted-foreground flex justify-center items-center h-96 w-full">
                  No results. Try searching for a song.
                </div>
              )}

              {!isLoading &&
                videos.map((video) => (
                  <div
                    key={video.videoId}
                    className="mb-4 flex items-center gap-4"
                  >
                    <img
                      src={video.image}
                      alt={video.author}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold line-clamp-2">
                        {video.title}
                      </p>
                      <p className="text-sm font-extralight line-clamp-1 text-gray-700 dark:text-gray-400">
                        {video.description}
                      </p>
                      <p className="text-xs text-gray-600">{video.author}</p>
                    </div>
                  </div>
                ))}
            </ScrollArea>
          </div>
          <DrawerFooter></DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
