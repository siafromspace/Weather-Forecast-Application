import { useState } from "react"
import { BiCurrentLocation } from "react-icons/bi"
import { MdLocationPin, MdClose } from "react-icons/md"
import { formatToLocalTime, iconURLFromCode } from "../services/weatherServices"

const Nav = ({ setQuery, weather: { temp, details, dt, timezone, name, country, description, icon } }) => {
    const [searchBar, setSearchBar] = useState(false)
    const [city, setCity] = useState("")

    const toggleSearch = () => {
        return setSearchBar(!searchBar)
    }

    const navDisplay = searchBar ? "hidden" : "flex"
    const searchDisplay = searchBar ? "flex" : "hidden"

    const cities = [
        {
            id: 1,
            title: "London"
        },
        {
            id: 2,
            title: "New York"
        },
        {
            id: 3,
            title: "Tokyo"
        },
        {
            id: 4,
            title: "Amsterdam"
        },
        {
            id: 5,
            title: "Rome"
        }
    ]

    const handleSearchClick = () => {
        if (city !== "") {
            setQuery({ q: city })
        }
        setSearchBar(false)
    }
    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude
                let lon = position.coords.longitude
                setQuery({ lat, lon })
            })
        }
    }
    return (
        <>
            <div className={`nav ${navDisplay} flex-col justify-around items-center h-screen sm:sticky sm:top-0`}>
                <div className="flex justify-between w-full">
                    <button className="bg-dark-gray text-white px-4 py-2 text-sm" onClick={toggleSearch}>Search for places</button>
                    <button className="bg-dark-gray text-white rounded-full p-2 text-xl" onClick={handleLocationClick}><BiCurrentLocation /></button>
                </div>
                <img src={iconURLFromCode(icon)} className="w-52" />
                <p className="text-white text-8xl font-bold">{temp.toFixed()}<span className="text-dark-gray text-4xl align-top">°</span></p>
                <p className="text-3xl font-medium text-light-gray">{details}</p>
                <p className="text-xl font-light text-white">{description}</p>
                <div className="flex flex-col items-center text-light-gray space-y-4">
                    <p className="text-sm">Today  •  {formatToLocalTime(dt, timezone)}</p>
                    <p className="text-sm inline-flex items-center"><span className="inline"><MdLocationPin /></span>{name}, {country}</p>
                </div>
            </div>
            <div className={`${searchDisplay} w-full flex flex-col h-screen sm:sticky sm:top-4`}>
                <button className="flex justify-end text-2xl text-white cursor-default"><MdClose onClick={toggleSearch} className="cursor-pointer" /></button>
                <div className="flex flex-wrap gap-4 mt-4">
                    <input type="text" placeholder="search location" className="w-3/4 md:w-auto bg-none border border-light-gray p-2 text-sm focus:outline-none placeholder:text-dark-gray" onChange={(e) => { setCity(e.target.value) }} />
                    <button className="bg-button text-white text-sm p-2 rounded-sm transition hover:scale-105 ease-in" onClick={handleSearchClick}>Search</button>
                </div>
                <ul className="space-y-8 mt-12">
                    {cities.map(city => {
                        return <li key={city.id} className="hover:border-dark-gray hover:border px-2 py-3 text-white text-sm cursor-pointer"
                            onClick={() => {
                                setQuery({ q: city.title })
                                setSearchBar(false)
                            }}
                        >{city.title}</li>
                    })}
                </ul>
            </div>
        </>
    );
}

export default Nav;