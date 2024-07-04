import { Link } from "react-router-dom";
import Layout from "./header-bg";

const Header = () => {
    return (
        <Layout>
            <div className="w-full lg:w-1/2 h-full pt-20 lg:pt-40 pb-10 lg:pb-20">
                <p  className="text-4xl lg:text-6xl ml-4 lg:ml-10 pt-5 ">
                    <span className="text-lime-900 font-semibold">MIDORI </span>
                    <span className="text-lime-800">POS SYSTEM</span>
                </p>
                <p className="text-lime-900 ml-4 lg:ml-10 mb-5 font-semibold text-lg lg:text-xl">
                    Make your own customized POS System!
                </p>
                <div className="flex justify-center">
                    <Link to='/register' className="bg-lime-700 text-white p-2 hover:bg-lime-500">
                        Get Started
                    </Link>
                </div>    
            </div>
        </Layout> 
    )
      
}

export default Header;