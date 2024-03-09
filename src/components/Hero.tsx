import { Hero_Img } from "@/constants";

export const Hero = () => {
  return (
    <section className="custom-container min-h-screen md:h-80vh">
      <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center md:h-full">
        <div className="w-full md:w-1/2 p-10 text-center md:text-left">
          <h1 className="font-bold text-2xl md:text-5xl lg:text-7xl leading-none mb-4 text-primary">
            Spend Smarter Save More
          </h1>
          <p className="mb-10 text-md md:text-3xl font-medium">
            Simple way to manage personal finances
          </p>
          <button className="btn btn-green">Get started</button>
        </div>
        <div className="w-full md:w-1/2 text-center inline h-1/2 md:h-full">
          <img className="w-full md:max-h-full" src={Hero_Img} />
        </div>
      </div>
    </section>
  );
};