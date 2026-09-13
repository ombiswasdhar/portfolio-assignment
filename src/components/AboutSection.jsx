import aboutFullFrame from '../assets/about/about_full_frame.png'
import aboutLeftCard from '../assets/about/about_left_card.png'
import aboutRightCollage from '../assets/about/about_right_collage.png'

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About Me section"
      className="relative w-full bg-black text-white select-none overflow-hidden pt-8 pb-20 md:py-24"
    >
      {/* Decorative ambient background glow matching the hero banner */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-red-950/20 blur-[140px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-[1380px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* ================= DESKTOP / TABLET VIEW (md and up) ================= */}
        <div className="hidden md:block w-full">
          <div className="relative w-full max-w-[1240px] mx-auto aspect-[1024/768] rounded-[28px] lg:rounded-[36px] overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.9)] border border-white/10 group transition-all duration-500 hover:border-white/20">
            <img
              src={aboutFullFrame}
              alt="About Me - Om, UI/UX Designer, Illustrator, Artist based in Shillong, India. Age 21 Years."
              className="w-full h-full object-cover lg:object-contain object-center select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.01]"
            />
          </div>
        </div>

        {/* ================= MOBILE VIEW (Stacked column) ================= */}
        <div className="md:hidden flex flex-col items-center gap-8 w-full max-w-[500px] mx-auto">
          {/* Top 'portfolio' cursive text */}
          <div className="flex justify-center">
            <span className="font-script text-3xl font-normal leading-none tracking-wide text-white lowercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              portfolio
            </span>
          </div>

          {/* Left Card */}
          <div className="w-full rounded-[28px] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.8)] border border-white/10">
            <img
              src={aboutLeftCard}
              alt="Hello, i'm OM. UI/UX designer, illustrator, artist based in Shillong, India."
              className="w-full h-auto object-contain select-none pointer-events-none"
            />
          </div>

          {/* Right Collage */}
          <div className="w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
            <img
              src={aboutRightCollage}
              alt="About Me - Om, 21 years old Graphics Designer collage"
              className="w-full h-auto object-contain select-none pointer-events-none"
            />
          </div>
        </div>

        {/* ================= SCREEN READER / SEO METADATA ================= */}
        <div className="sr-only">
          <h2>About Me — Hello, i'm OM.</h2>
          <p>UI/UX designer, illustrator, and artist based in Shillong, India.</p>
          <p>
            Since 8th grade my knack for illustrations, character design, and anything
            related to design has been constantly growing.
          </p>
          <p>
            For a long time I was into character designing, then started exploring other
            areas, such as UI/UX design, graphic design, illustrations, video editing,
            3D design, and product design.
          </p>
          <p>
            As a new and curious artist, I'm always exploring different styles and mediums;
            it's how I learn and evolve. I love experimenting, taking inspiration from
            everywhere, and turning simple ideas into something visual and expressive.
          </p>
          <p>
            I'm also really into sports and staying active. It helps me keep my energy up
            and my creativity flowing. I like to think the discipline from sports shows up
            in my art too.
          </p>
          <p>Profile: Age 21 Years | Graphics Designer</p>
        </div>

      </div>
    </section>
  )
}
