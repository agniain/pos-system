const HomeContent = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center py-10 bg-lime-50">
            <div className="md:w-1/2 text-amber-900">                        
                <div className="flex flex-col md:flex-row my-3 md:my-5">
                    <div className="md:w-1/6 ml-auto">
                        <img src="/images/PosIcon1.png"alt="" className="w-full" />                
                    </div>          
                    <div className="md:w-1/2 text-amber-900 ml-auto mt-10">
                        <p className="text-xl font-bold">Excellent Services</p>                 
                    </div>                            
                </div>
                <div className="flex flex-col md:flex-row my-3 md:my-5">
                    <div className="md:w-1/6 ml-auto">
                        <img src="/images/PosIcon2.jpg"alt="" className="w-full" />                
                    </div>          
                    <div className="md:w-1/2 text-amber-900 ml-auto mt-10">
                        <p className="text-xl font-bold">Customize Your Charts</p>                 
                    </div>
                </div>
            </div>                   
            <div className="md:w-1/2 text-amber-900">                        
                <div className="flex flex-col md:flex-row my-3 md:my-5">
                    <div className="md:w-1/2 text-amber-900 mt-10 ml-10">
                        <p className="text-xl font-bold">Complete Features</p>                 
                    </div>
                    <div className="md:w-1/6">
                        <img src="/images/PosIcon3.png"alt="" className="w-full" />                
                    </div>  
                </div>
                <div className="flex flex-col md:flex-row my-3 md:my-5">
                    <div className="md:w-1/2 text-amber-900 mt-10 ml-10">
                        <p className="text-xl font-bold">Accurate Results</p>                 
                    </div>
                    <div className="md:w-1/6">
                        <img src="/images/PosIcon4.png"alt="" className="w-full" />                
                    </div>  
                </div>
            </div> 
        </div>      
    )     
}

export default HomeContent;