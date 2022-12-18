import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import SingleTournmate from './SingleTournmate'
import { useCallback, useEffect, useState } from 'react';

export default function Tournaments({competitions}) {

    const [emblaRef, embla] = useEmblaCarousel({
        align: "start",
        loop: true,
        inViewThreshold: 0.33,
        slidesToScroll: 'auto'
      },[Autoplay()]);
      const [scrollSnaps, setScrollSnaps] = useState([]);
      const [selectedIndex, setSelectedIndex] = useState(0);
    
      const scrollTo = useCallback((index) => embla && embla.scrollTo(index), [
        embla
      ]);

      const onSelect = useCallback(() => {
        if (!embla) return;
        setSelectedIndex(embla.selectedScrollSnap());
      }, [embla, setSelectedIndex]);
      useEffect(() => {
        if (!embla) return;
        onSelect();
        setScrollSnaps(embla.scrollSnapList());
        embla.on("select", onSelect);
      }, [embla, setScrollSnaps, onSelect]);
    

    
  return (
    <div>
        <p className='md:text-3xl text-xl font-bold'>#Trending tournaments</p>
        <div className="embla mt-7" ref={emblaRef}>
            <div className="embla__container">
                {competitions && competitions.map(item => (
                    <SingleTournmate key={item.id} item={item} />
                ))}
            </div>
        </div>
        <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
         
          <button
            key={index}
            className={`embla__dot ${index === selectedIndex ? "is-selected" : ""}`}
            type="button"
            onClick={() => scrollTo(index)}
            />
        ))}
      </div>
    </div>
  )
}
