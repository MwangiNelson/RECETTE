import { useState } from 'react'
import { ModelProvider } from './modules/contexts/ModelContext';

import Footer from './components/layouts/footer'
import { Boxes } from "./components/ui/background-boxes";
import { cn } from "./components/utils/cn";
import PageTransition from './components/layouts/pageTransition';
import StairTransition from './components/layouts/StairTransition';
import NavigationRoutes from './routes/navigation';
import { useLocation } from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0)
  const location = useLocation();
  console.log(location.pathname)
  return (
    <ModelProvider>
      <div className="h-fit min-h-screen relative w-screen overflow-hidden bg-[#ff5400] flex flex-col items-center justify-center rounded-lg">
        {location.pathname !== '/recipe-page' ? <div className="absolute inset-0 w-full h-full bg-orange-900 [mask-image:radial-gradient(transparent,white)] pointer-events-none" /> : null}
        {/* <StairTransition /> */}
        {location.pathname === '/' ? <Boxes /> : null}
        <PageTransition>

          <NavigationRoutes />
        </PageTransition>
        <Footer />
      </div>
    </ModelProvider>
  )
}

export default App
