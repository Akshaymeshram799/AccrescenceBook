import Image from "next/image";
import imgSrc from '../public/Images/1.png'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { realtimeDb } from "../backend/firebase/firebase";
import {useState,useEffect} from 'react'
import { auth } from "../backend/firebase/firebase";




const Position = (props) => {

  const [userId,setUserId] = useState('')
  const [pageNo,setPageNo] = useState(1)

  const [arr,setArr] = useState([])

  useEffect(async ()=>{
      auth.onAuthStateChanged((user)=>{
        if(user){         
          setUserId(user.uid)   
          readHighlight(userId)  
            
        }
      })
  },[])
  
  const [SX,setSX] = useState(0)
  const [SY,setSY] = useState(0)
  
  const readHighlight = (user)=>{
    realtimeDb.ref('highlight/'+ user + '/' + pageNo).on('value',(snapshot)=>{
        console.log(snapshot.val());   
        const Data = snapshot.val();
        if(Data!=null){

          let keys = Object.keys(Data)

          console.log(keys);
          console.log(arr)
          
          for(let i = 0 ; i<keys.length ; i++){
             console.log(Data[keys[i]]);
             let temp = []
             temp = arr
             temp.push(Data[keys[i]]) 
             setArr(temp)
  
          }
        }
    })
  }
  
  const MouseDownEvent = (e)=>{
    let SX = e.nativeEvent.offsetX;            
    let SY = e.nativeEvent.clientY;

    let SXP = Math.round((SX/500)*100);
    let SYP = Math.round((SY/500)*100);



    setSX(SXP)
    setSY(SYP)
    

   }
  
  const MouseUpEvent = (e)=>{
    let EX = e.nativeEvent.offsetX;            
    // let SY = e.nativeEvent.clientY;
    
    let EXP = Math.round((EX/500)*100);
    // let SYP = Math.round((SY/400)*100);
    
   
    
    realtimeDb.ref('highlight/'+ userId + '/' + pageNo).push({
      EXV : EXP,
      SXV : SX,
      SYV : SY
    })    

      
   }

  
    return ( 
        <>
          <div style={{width:"800px",position:"relative"}}  id="aks"  >
              <img src="Images/1.png" style={{width:"500px",height:"500px"}} draggable="false" 
              onMouseUp={ MouseUpEvent }
              onMouseDown={ MouseDownEvent } />
              {
                arr.map((val,key)=>{
                  return <div style={{position : 'absolute', top:val.SYV + "%" , left:val.SXV + "%", width: val.EXV-val.SXV + "%",height:"3%",backgroundColor:"yellow"}} key={key}></div>
                })
              }
          </div>
        </>
     );
}
 
export default Position;