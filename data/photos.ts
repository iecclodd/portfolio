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
  {
    src: "/photos/drone-build.jpg",
    alt: "FPV drone build on the workbench",
    caption: "Building FPV drones",
  },
  {
    src: "/photos/robotics.jpg",
    alt: "Competition robot on the field",
    caption: "Robotics competition",
  },
  {
    src: "/photos/speed-climbing.jpg",
    alt: "Climbing a competition speed wall",
    caption: "Speed climbing",
  },
  {
    src: "/photos/awards.jpg",
    alt: "Rally winner plaques",
    caption: "Award-winning builds",
  },
  {
    src: "/photos/card-collection.jpg",
    alt: "Trading card collection",
    caption: "Card collecting",
  },
];
