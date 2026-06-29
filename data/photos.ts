/**
 * PHOTOS
 * ------------------------------------------------------------------
 * Drop your images into `public/photos/` and reference them here.
 * Any photo whose file is missing shows a graceful placeholder, so
 * the site never breaks — just add the files when you have them.
 *
 *   public/photos/portrait.jpg   ← main hero portrait (tall ~3:4)
 *   public/photos/life-1.jpg …   ← gallery shots for the About section
 */

export interface Photo {
  src: string;
  alt: string;
  caption?: string;
}

/** Big portrait shown at the top of the page. */
export const portrait: Photo = {
  src: "/photos/portrait.jpg",
  alt: "Azaan Noman",
  caption: "Azaan Noman",
};

/** Smaller candid stacked behind the portrait in the hero. */
export const heroSecondary: Photo = {
  src: "/photos/portrait-2.jpg",
  alt: "Azaan Noman — candid",
};

/** Gallery shown in the About / Interests section. */
export const gallery: Photo[] = [
  { src: "/photos/life-1.jpg", alt: "Building", caption: "In the workshop" },
  { src: "/photos/life-2.jpg", alt: "Outdoors", caption: "Off the clock" },
  { src: "/photos/life-3.jpg", alt: "Training", caption: "Training" },
  { src: "/photos/life-4.jpg", alt: "Travel", caption: "On the move" },
  { src: "/photos/life-5.jpg", alt: "Drones", caption: "Drone tinkering" },
];
