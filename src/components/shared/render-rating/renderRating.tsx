import {Star} from "lucide-react";

const RenderRating = ({rate}: {rate: number}) => {
  if (rate > 5) {
    rate = 5;
  }

  const fullStars = Math.floor(rate);
  const emptyStars = 5 - fullStars;

  const stars = Array.from({ length: fullStars }, (_, index) => (
      <Star key={`full-${index}`} className="fill-amber-500 text-amber-500" />
  ));
  const starsE = Array.from({ length: emptyStars }, (_, index) => (
      <Star key={`empty-${index}`} className="text-amber-500" />
  ));

  return (
      <div className="flex items-center gap-1 mt-1">
        <div className="flex items-center gap-1 w-22">
          {stars} {starsE}
        </div>
      </div>
  );
}
export default RenderRating