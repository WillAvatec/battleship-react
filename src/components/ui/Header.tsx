import Helmet from "../../assets/helmet.png"

function Header(){
    return (
        <header className="bg-amber-100 relative py-4 text-center text-green-950 text-3xl font-bold tracking-wider flex flex-row justify-center items-center gap-4">
            <nav className="absolute left-0 sm:left-5 bottom-0 flex flex-row gap-1 items-center">
                <div id="left-triangle" />
                <a className="text-base tracking-normal underline" href="/">Return</a>
            </nav>
            <img className="hidden sm:block w-10" src={Helmet} />
            <p>BATTLESHIP</p>
        </header>
    )
}

export default Header