"use client";

import { useState } from "react";
import TrailerModal from "./trailer-model";
import { Button } from "./ui/button";
import { Play } from "lucide-react";

interface TrailerButtonProps {
  videoKey: string;
  title: string;
}

export default function TrailerButton({ videoKey, title }: TrailerButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        size="lg"
        onClick={() => setIsModalOpen(true)}
        className="gap-2 px-8"
      >
        <Play className="w-5 h-5" />
        Play Trailer
      </Button>

      <TrailerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoKey={videoKey}
        title={title}
      />
    </>
  );
}
