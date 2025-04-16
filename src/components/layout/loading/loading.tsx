import { Atom } from "react-loading-indicators";
import {JSX, Suspense} from "react";

const Loading = () => {
  return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <Atom color="#000000" size="large" text="" textColor="#000000" />
      </div>
  )
}
export default Loading

const SuspenseElement = ({children}: { children: JSX.Element }) => {
  return (
      <Suspense fallback={<Loading/>}>
        {children}
      </Suspense>
  )
}

export {Loading, SuspenseElement}