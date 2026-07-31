import Film from './icons/film'
import Chart from './icons/chart'
import Series from './icons/series'
import Anime from './icons/clapperboard'
import Settings from './icons/settings'

export default function(){
    return(
        <div className="bg-[#36393e] w-[200px] h-[100vh] flex flex-col gap-[30px] justify-center font-sans text-[white] text-[20px] navigation">
            <h2>Menu</h2>
            <div className="card"><Chart />Overview</div>
            <div className='card'><Film />Movie</div>
            <div className="card"><Series />Series</div>
            <div className="card"><Anime />Anime</div>
            <h2>Other</h2>
            <div className="card"><Settings />Settings</div>
        </div>
    )
}