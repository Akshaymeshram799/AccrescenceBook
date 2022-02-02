import Layout from "../../components/Layout";
import {  useRouter } from "next/router";
import { MetaTags } from "react-meta-tags";

const Aks = () => {
    const Router = useRouter();
    const {params=[]} = Router.query;

    const toInt = parseInt(params[0])
      
    if(params.length === 1){

        return(
            <>

             <Layout link={toInt} />
            </>
        )
    }else if(params.length===2){
        return <Layout />
    }

    
    return (
        <>
            <Layout />
            
        </>
    );
}

const getServerSideProps = async (context)=>{
    
    const {params} = context.query
    console.log(params);

     const res = await fetch(`http://localhost:3001/Data`)
     const data = await res.json()
     return{
         props : {
             data
         }
     }
}

export default Aks;
export {getServerSideProps}