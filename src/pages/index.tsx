import { GetServerSideProps } from "next"
import {
  getClasses,
  getFacilities,
  getInstructors,
  getLocations,
  getSports,
} from "@/api"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold text-center md:text-6xl">
        Hello World
      </h1>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const [classes, facilities, instructors, locations, sports] =
    await Promise.all([
      getClasses(),
      getFacilities(),
      getInstructors(),
      getLocations(),
      getSports(),
    ])

  return {
    props: {
      classes,
      facilities,
      instructors,
      locations,
      sports,
    },
  }
}
