import RouteController from "@/routes/routeController.tsx";
import {Toaster} from "sonner";
import ScrollToTop from "@/components/shared/scroll-to-top/scroll-to-top.tsx";

function App() {

  return (
    <>
      <RouteController/>
      <Toaster position="top-right" richColors />
      <ScrollToTop/>
    </>
  )
}

export default App
