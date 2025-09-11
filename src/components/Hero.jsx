import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all';
import gsap from 'gsap';

const Hero = () => {
useGSAP(() => {
  // ✅ Wait for fonts before running SplitText
  document.fonts.ready.then(() => {
    const heroSplit = new SplitText('.title', { type: 'chars, words' });
    const paragraphSplit = new SplitText('.subtitle', { type: 'lines' });

    heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.06,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.06,
      delay: 1,
    });
  });

  // ✅ Correct timeline syntax
  gsap.timeline({
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  })
  .to('.right-leaf', { y: 200 }, 0)
  .to('.left-leaf', { y: -200 }, 0);
}, []);

  return (
<>
<section id="hero" className="noisy">
   <h1 className='title'>PALOMA</h1>

    <img src='./../public/images/footer-left-leaf.png'
   alt='left-leaf'
   className='left-leaf'
   />
   <img src='./../public/images/footer-right-leaf.png'
   alt='right-leaf'
   className='right-leaf'
   />
   
   <div className='body'>
    <div className='content'>
      <div className='space-y-5 hidden md:block'>
        <p>Cool. Crisp. Classic.</p>
        <p className='subtitle'>
          Sip the Spirit <br/> of Summer
        </p>
      </div>
      <div className='view-cocktails'>
        <p className="subtitle">
          Each cocktail we serve is a masterpiece – crafted with premium spirits, fresh ingredients, and a touch of artistry to create unforgettable moments in every sip.
        </p>
        <a href='#cocktails'>View Cocktails</a>
      </div>
    </div>
   </div>
</section>
</>
  )
}

export default Hero
