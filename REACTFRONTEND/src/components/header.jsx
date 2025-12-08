import './Utils.css'
import './Style.css'
function Header(){
    return <>
    <header>
        <nav className="navbar flex justify-between">
          <span className="flex align-center">
            <h2 className="bg-blue pd-5px">Vansh Fitness</h2>
          </span>
          <ul className="flex justify-between align-center">
            <li className="crsr-point blue-line-hover"><a className='text-deco-none clr-black' href="https://www.google.com/?zx=1760464324432&no_sw_cr=1">About</a> </li>
            <li className="crsr-point blue-line-hover"><a className='text-deco-none clr-black' href="https://www.google.com/?zx=1760464324432&no_sw_cr=1">Home</a> </li>
            <li className="crsr-point blue-line-hover"><a className='text-deco-none clr-black' href="https://www.google.com/?zx=1760464324432&no_sw_cr=1">Services</a> </li>
            <li className="crsr-point blue-line-hover"><a className='text-deco-none clr-black' href="https://www.google.com/?zx=1760464324432&no_sw_cr=1">Contact us </a></li>
            <button className="btn crsr-point">Join us</button>
          </ul>
        </nav>
        <hr />
      </header>
    </>
}

export default Header