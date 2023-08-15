import hearth from '../../assets/hearth.png'

export default function Footer () {
    return (
        <footer className='fixed bottom-0 w-full bg-black py-2 z-20'>
            <ul className='flex flex-row items-center'>
                <li className='flex flex-row items-center px-5 gap-1'>
                    <span className='ml-6'>Made with</span> 
                    <img className='w-8' src={hearth}/>
                    <span>by</span>
                    <a className='text-yellow-500' target='_blank' href="https://github.com/WillAvatec/battleship-react">
                        WillAvatec
                    </a>
                </li>
                <li className='ml-auto pr-5 py-1'>
                    <a href="https://www.theodinproject.com/lessons/node-path-javascript-battleship">
                        The Odin Project
                    </a>
                </li>
            </ul>
        </footer>
    )
}