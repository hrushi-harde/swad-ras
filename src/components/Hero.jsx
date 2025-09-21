import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const Hero = () => {
  const videoRef = useRef();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const heroSplit = new SplitText(".title", { type: "chars, words" });
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1,
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0)
      .to(".arrow", { y: 100 }, 0);

    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

    videoRef.current.onloadedmetadata = () => {
      let targetTime = 0;
      let currentTime = 0;

      gsap.timeline({
        scrollTrigger: {
          trigger: "video",
          start: startValue,
          end: endValue,
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            targetTime = self.progress * videoRef.current.duration;
          },
        },
      });

      function smoothUpdate() {
        if (videoRef.current) {
          currentTime += (targetTime - currentTime) * 0.1;
          videoRef.current.currentTime = currentTime;
          requestAnimationFrame(smoothUpdate);
        }
      }
      smoothUpdate();
    };
  }, []);

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title pt-{-10}">PALOMA</h1>

      

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Exotic. Flavorful. Unforgettable.</p>
              <p className="subtitle">
                Taste the Essence <br /> of Elegance
              </p>
            </div>
            <div className="view-cocktails">
              <p className="subtitle">
                Each cocktail we serve is a masterpiece – crafted with premium
                spirits, fresh ingredients, and a touch of artistry to create
                unforgettable moments in every sip.
              </p>
              <a href="#cocktails">View Cocktails</a>
            </div>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0">
        <video
          src="/videos/input.mp4"
          ref={videoRef}
          muted
          playsInline
          preload="auto"
        />
      </div>
    </>
  );
};

export default Hero;
