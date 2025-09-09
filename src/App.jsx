import { ScrollTrigger, SplitText } from "gsap/all";
import { gsap } from "gsap";
  
gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <div className="flex-center h-[100vh]">
      Hello G-SAP
    </div>
  )
}

export default App
