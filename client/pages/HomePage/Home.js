import React from "react"
import { homeObjOne } from "./Data"
import InfoSection from "../../components/InfoSection/InfoSection"

function Home({ auth, setAuth }) {
  return (
    <>
      <InfoSection auth={auth} setAuth={setAuth} {...homeObjOne} />
    </>
  )
}

export default Home
