import { Carousel, IconButton } from "@material-tailwind/react";
 
export default function CarouselCustomArrows() {

  return (
    <Carousel
      autoplay={true}
      autoplayDelay={4000}
      loop={true}
      className="rounded-xl"
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-2/4 left-4 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 !right-4 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </IconButton>
      )}
    >
      <div className="h-full w-full object-cover bg-red-200 flex justify-center content-center">
            <div className="mt-4">
                <h1 className="font-mono text-4xl text-center font-bold">PENGUNGUMAN</h1>
                <br />
                <h1 className="font-mono text-1xl mt-12 text-center max-w-md">Telah dibuka Lowongan untuk Asisten Dosen. Lowongan akan ditutup pada 18 Agustus 2023 Pk.23.59 WIB</h1>
            </div>     
      </div>

      <div className="h-full w-full object-cover bg-red-300 flex justify-center content-center">
            <div className="mt-4">
                <h1 className="font-mono text-4xl text-center font-bold">PENGUNGUMAN</h1>
                <br />
                <h1 className="font-mono text-1xl mt-12 text-center max-w-md">Telah dibuka Lowongan untuk Asisten Dosen. Lowongan akan ditutup pada 18 Agustus 2023 Pk.23.59 WIB</h1>
            </div>       
      </div>

      <div className="h-full w-full object-cover bg-red-400 flex justify-center content-center">
            <div className="mt-4">
                <h1 className="font-mono text-4xl text-center font-bold">PENGUNGUMAN</h1>
                <br />
                <h1 className="font-mono text-1xl mt-12 text-center max-w-md">Telah dibuka Lowongan untuk Asisten Dosen. Lowongan akan ditutup pada 18 Agustus 2023 Pk.23.59 WIB</h1>
            </div>       
      </div>
    </Carousel>
  );
}