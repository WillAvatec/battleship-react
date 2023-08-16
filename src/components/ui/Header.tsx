import Helmet from "../../assets/helmet.png"

function Header(){
    return (
        <header className="bg-black relative py-4 text-center text-white text-3xl font-bold tracking-wider flex flex-row justify-center items-center gap-4">
            <nav className="absolute left-1 sm:left-5 bottom-2 flex flex-row gap-1 items-center">
                <div id="left-triangle" />
                <a className="text-sm font-normal  sm:text-base tracking-normal underline" href="/">Return</a>
            </nav>
            <img className="hidden sm:block w-10" src={Helmet} />
            <p>BATTLESHIP</p>
            <img className="hidden sm:block w-10" src={Helmet} />
        </header>
    )
}

export default Header