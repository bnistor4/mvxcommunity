import type React from "react";

const HowItWorks: React.FC = () => {
  return (
    <div className="py-20 bg-primary-foreground relative overflow-hidden">
      <div className="container max-w-5xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">What is the idea?</h2>
          <p className="text-xl font-bold">
            List your community and make yourself known
          </p>
        </div>

        <div className="flex flex-row md:flex-row gap-10 mt-12 mb-12">
          <div className="w-6/12 flex flex-col items-center text-center space-y-6 ">
            <div className="brutal-card p-0 overflow-hidden -rotate-2">
              <img
                src="/1.webp"
                alt="New users search communities"
                className="aspect-[1/1] object-cover"
              />

              <div className="font-handwriting text-5xl text-primary font-bold px-6 py-2 rotate-3 absolute top-0 left-0">
                1
              </div>

              <div className="bg-white pb-4 mt-[-50px]">
                <h3 className="text-xl font-bold mb-2">
                  New users search communities
                </h3>
                <p className="text-foreground font-handwriting">
                  From new and old users
                </p>
              </div>
            </div>
          </div>

          <div className="w-6/12 flex flex-col items-center text-center space-y-6">
            <div className="brutal-card p-0 overflow-hidden rotate-2 overflow-hidden">
              <img
                src="/2.webp"
                alt="Communities need members"
                className="aspect-[1/1] object-cover"
              />
              <div className="font-handwriting text-5xl text-primary font-bold px-6 py-2 -rotate-3 absolute top-0 left-0">
                2
              </div>
              <div className="bg-white pb-4 mt-[-50px]">
                <h3 className="text-xl font-bold mb-2">
                  Communities need members
                </h3>
                <p className="text-foreground font-handwriting">
                  To new and cool members
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-2xl font-bold flex items-center justify-center gap-3 brutal-border bg-white p-4 shadow-brutal inline-block">
            we unite them
            <span className="text-3xl animate-wiggle inline-block">🫂</span>
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary brutal-border rotate-12 hidden md:block"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-accent brutal-border -rotate-6 hidden md:block"></div>
    </div>
  );
};

export default HowItWorks;
