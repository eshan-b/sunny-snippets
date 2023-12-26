import Image from "next/image";
import heroImage from "../assets/dream-isometric 1.svg";

const HeroSection = () => {
  return (
    <div className="hero min-h-[75vh] bg-gradient-to-b from-peach-orange to-white">
      <div className="text-center pt-5">
        <h1
          className="font-bold"
          style={{ fontSize: "5rem", letterSpacing: "0.16em" }}
        >
          <span className="text-dark-orange1">START </span>
          <span className="text-dark-orange2">YOUR </span>
          <span className="text-dark-orange3">DAY</span>
        </h1>
        <Image
          src={heroImage}
          alt="Sleeping Illustration"
          className="mt-2 mx-auto rounded-lg"
          style={{
            maxWidth: "70%",
            objectFit: "cover",
            objectPosition: "center",
          }}
          priority={true}
          decoding="async"
          referrerPolicy="no-referrer"
        />
        <p
          className="text-3xl text-dark-orange3 mt-2 font-bold"
          style={{ letterSpacing: "0.16em" }}
        >
          with a ray of sunshine
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
