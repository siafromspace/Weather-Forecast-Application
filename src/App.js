import './App.css';
import Nav from './components/Nav';
import Main from './components/Main';
import { useState, useEffect } from "react"
import getFormattedWeatherData from './services/weatherServices';
import Loader from "./assets/loading.svg"
import { ToastContainer, toast, Zoom } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {

  const [query, setQuery] = useState({ q: "Lagos" })
  const [units, setUnits] = useState("metric")
  const [weather, setWeather] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      const message = query.q ? query.q : "current location"
      toast.info("Fetching weather for " + message)
      await getFormattedWeatherData({ ...query, units }).then(data => {
        toast.success(`Successfully fetched data for ${data.name}, ${data.country}.`)
        setIsPending(false)
        setWeather(data)
        setError(null)
      }).catch(err => {
        setError(err.message)
        toast.error(error)
      })

    }
    fetchWeatherData()
  }, [query, units])

  return (
    <div className="w-full h-screen mx-auto grid grid-cols-12">
      {isPending &&
        <div className="w-full h-screen bg-dark-blue grid col-span-12 place-items-center">
          <img src={Loader} alt="loader" />
        </div>
      }
      {weather &&
        <>
          <aside className="col-span-12 sm:col-span-5 md:col-span-3 bg-light-blue md:h-full py-2 px-4">
            <Nav setQuery={setQuery} weather={weather} />
          </aside>
          <Main weather={weather} units={units} setUnits={setUnits} />
        </>
      }
      <ToastContainer
        position='top-center'
        transition={Zoom}
      />
    </div>
  );
}

export default App;
