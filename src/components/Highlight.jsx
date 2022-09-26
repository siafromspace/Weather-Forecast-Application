import { degToCompass } from "../services/weatherServices";

const Highlight = ({ weather: { speed, humidity, visibility, pressure, deg }, units }) => {

    let barHeight = {
        width: `${humidity}%`
    }

    return (
        <div className="space-y-8">
            <p className="text-white text-xl font-bold">Today's Highlights</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-light-blue py-4 px-4 text-white text-center space-y-2 flex flex-col items-center">
                    <p className="text-sm">Wind Status</p>
                    <p className="text-5xl font-bold">{speed}
                        <span className="text-xl font-light align-middle"> {units !== "metric" ? "mph" : "mps"}</span>
                    </p>
                    <p>{degToCompass(deg)}</p>
                </div>
                <div className="bg-light-blue py-4 px-12 text-white text-center space-y-2 flex flex-col items-center">
                    <p className="text-sm">Humidity</p>
                    <p className="text-5xl font-bold">{humidity}<span className="text-xl font-light align-middle"> %</span></p>
                    <div className="flex flex-col flex-grow w-full">
                        <p className="flex w-full justify-between text-sm text-light-gray">
                            <span>0</span>
                            <span>50</span>
                            <span>100</span>
                        </p>
                        <div className="bg-white h-2 w-full rounded-md">
                            <div className={`bg-yellow h-full rounded-md`} style={barHeight}></div>
                        </div>
                        <p className="flex justify-end text-sm text-light-gray">%</p>
                    </div>
                </div>
                <div className="bg-light-blue py-4 px-4 text-white text-center space-y-2 flex flex-col items-center">
                    <p className="text-sm">Visibility</p>
                    <p className="text-5xl font-bold">{visibility / 1000}<span className="text-xl font-light align-middle"> kilometres</span></p>
                </div>
                <div className="bg-light-blue py-4 px-4 text-white text-center space-y-2 flex flex-col items-center">
                    <p className="text-sm">Air Pressure</p>
                    <p className="text-5xl font-bold">{pressure}<span className="text-xl font-light align-middle"> hPa</span></p>
                </div>
            </div>
        </div>
    );
}

export default Highlight;
