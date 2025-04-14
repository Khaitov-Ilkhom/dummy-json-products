import RouteController from "@/routes/routeController.tsx";
import {Toaster} from "sonner";

function App() {

  return (
    <>
      <RouteController/>
      <Toaster position="top-right" richColors />
    </>
  )
}

export default App
