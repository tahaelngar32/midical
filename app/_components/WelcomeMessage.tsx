import Image from "next/image";

export default function WelcomeMessage() {
  return (
    <div
      className="
        flex  items-center justify-start
        rounded-[14px] px-6 pb-4 pt-4 my-4
        text-gray-100 font-[Inter] overflow-hidden relative
        min-h-[110px]
      "
      style={{
        background: "linear-gradient(90deg, #4a90b8, rgba(2, 15, 27, 0.82))",
      }}
    >
      {/* Doctor illustration */}
      <div className="flex-shrink-0 ml-.5 sm:ml-1 md:ml-4 ">
        <Image
          src="/image 2.png"
          alt=""
          aria-hidden="true"
          width={80}
          height={90}
          className="object-contain hidden md:block"
        />
      </div>

      {/* Text content */}
      <div className="flex-1 text-left space-y-2 md:space-y-4">
        {/* Greeting row */}
        <div className="flex items-center gap-2 leading-[2]">
          <p className="text-md sm:text-xl md:text-2xl font-semibold text-gray-100">
            Good Morning, Dr. Ahmed Ali
          </p>
          <Image
            src="/hand.png"
            alt=""
            width={50}
            height={50}
            className="inline-block"
          />
        </div>

        {/* Sub-text */}
        <p className="text-sm sm:text-sm md:text-base text-white/90 mt-1">
          You have 12 appointments scheduled for today. Here&apos;s your
          overview.
        </p>
      </div>
    </div>
  );
}
