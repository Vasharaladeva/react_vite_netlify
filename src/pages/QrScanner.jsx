import { Html5QrcodeScanner } from "html5-qrcode"
import { useEffect, useState } from "react"

export async function action() {

}

function NuevoCliente() {

    const [scannerResult, setScannerResult] = useState(null)

    useEffect(()=> {
        const scanner = new Html5QrcodeScanner('reader',{
            qrbox:{
                width: 250,
                height: 250
            },
            fps: 5,
        })
    
        scanner.render(success,error)
    
        function success(result){
           scanner.clear()
           setScannerResult(result)
        }
    
        function error(err){
            console.warn(err)
        }
    },[])
    
    

    return (
        <>
            <h1 className="font-black text-4xl text-blue-900">Scanear aqui:</h1>
            <p className="mt-3">Mostrar</p>
            <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>
                {
                    
                    scannerResult && <a href={"/estudiante/"+
                        JSON.stringify(scannerResult).replace(/\\/g, "").replace(/""/g, "")
                        }>{"/estudiante/"+
                        JSON.stringify(scannerResult).replace(/\\/g, "").replace(/""/g, "")
                        }</a>
                    
                }
            <div id="reader">

                
            </div>
            </div>
        </>
    )
}

export default NuevoCliente