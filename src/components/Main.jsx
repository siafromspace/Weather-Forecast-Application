import Forecast from "./Forecast";
import Highlight from "./Highlight";

const Main = ({ weather, units, setUnits }) => {
    return (
        <main className="col-span-12 sm:col-span-7 md:col-span-9 bg-dark-blue h-full py-4 px-12 md:px-24 space-y-12">
            <Forecast weather={weather} units={units} setUnits={setUnits} />
            <Highlight weather={weather} units={units} />
        </main>
    );
}

export default Main;