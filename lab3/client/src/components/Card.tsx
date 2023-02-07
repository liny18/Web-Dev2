interface CardProps {
  coordinates: string;
  common: string;
  official: string;
}

export const Card = ( { coordinates, common, official }: CardProps ) => {
  return (
    <div className="flex flex-col gap-2 bg-white bg-opacity-20 border-l-teal-100 border-l-4 p-5 fixed top-[40%] shadow-md">
      <p className="font-semibold text-lg text-white">{coordinates}</p>
      <p className="font-bold text-8xl text-white">{common}</p>
      <p className="font-medium text-2xl text-white">{official}</p>
    </div>
  );
};
