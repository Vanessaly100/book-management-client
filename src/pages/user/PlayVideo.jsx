import { useEffect, useRef, useState } from 'react';

const PlayVideo = () => {
  const [open, setOpen] = useState(false);
  const wavesRef = useRef([]);

  useEffect(() => {
    wavesRef.current.forEach((wave, i) => {
      if (wave) {
        wave.style.animationDelay = `${i * 0.5}s`;
      }
    });
  }, []);

  return (
    <>
      {/* Play Button */}
      <div className="relative w-24 h-24 flex items-center justify-center mx-auto cursor-pointer" onClick={() => setOpen(true)}>
        {[...Array(3)].map((_, i) => (
          <span
  key={i}
  ref={(el) => (wavesRef.current[i] = el)}
  className="absolute w-full h-full rounded-full border-2 border-green-700 ping-custom"
></span>

        ))}

        <div className="z-10 w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-800 transition">
          <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6 4l12 6-12 6V4z" />
          </svg>
        </div>
      </div>

      {/* Video Modal */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-lg max-w-3xl w-full overflow-hidden">
            <button
              className="absolute top-2 right-2 text-black text-2xl font-bold"
              onClick={() => setOpen(false)}
            >
              &times;
            </button>

            {/* YouTube Embed or HTML5 video */}
            <div className="aspect-w-16 aspect-h-9 w-full h-96">
            <iframe className='h-full w-full' src="https://www.youtube.com/embed/PfqgDG1qrKg?si=g0kNdNORbc8vTz87" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlayVideo;
