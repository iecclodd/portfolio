"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Photo } from "@/data/photos";

/**
 * PhotoFrame — shows an image with a warm framed look. If the file is
 * missing (or fails to load) it falls back to a tasteful "add a photo"
 * placeholder so the layout never breaks before real images are added.
 */
export function PhotoFrame({
  photo,
  className,
  rounded = "rounded-2xl",
  showCaption = true,
}: {
  photo: Photo;
  className?: string;
  rounded?: string;
  showCaption?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // The image can 404 before React hydrates, so the onError event is missed.
  // Re-check on mount: a "complete" image with zero natural width has failed.
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <figure
      className={cn(
        "group relative overflow-hidden border border-border bg-card shadow-[0_18px_40px_-24px_rgba(111,78,55,0.45)]",
        rounded,
        className
      )}
    >
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={photo.src}
          alt={photo.alt}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-card to-background p-6 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-border bg-background/70 text-accent-blue">
            <ImagePlus className="h-5 w-5" />
          </span>
          <p className="text-sm font-medium text-foreground">Add a photo</p>
          <p className="font-mono text-[0.7rem] leading-relaxed text-muted">
            {photo.src.replace("/", "public/")}
          </p>
        </div>
      )}

      {/* warm bottom gradient + caption */}
      {showCaption && photo.caption && !failed && (
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 to-transparent p-4">
          <span className="font-mono text-xs uppercase tracking-wider text-background">
            {photo.caption}
          </span>
        </figcaption>
      )}
    </figure>
  );
}
