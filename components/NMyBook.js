import { Flip, PageFlip } from "page-flip";
import { useEffect, useState,useRef } from "react";
import styles from '../styles/book.module.css'
import { useRouter } from "next/router";



const Book = ({link}) => {


    const [pageF,setPageF] = useState(null)
  
     
    useEffect(()=>{

         
            let pageFlip = new PageFlip(document.getElementById('book'),{
              width:330,
              height:500,
              showCover:true              
          })

          setPageF(pageFlip)

 
         pageFlip.loadFromHTML(document.querySelectorAll('.my-page'));
         
         let nBtn = document.getElementById('nexBtn')
         nBtn.addEventListener('click',()=>{
             pageFlip.flipNext()
         })

         let pBtn = document.getElementById('prvBtn')
         pBtn.addEventListener('click',()=>{
             pageFlip.flipPrev()
         })

         let totalPages = document.getElementById('tPages') 
         totalPages.innerText=`${pageFlip.getPageCount()} ]`

         let currPage = document.getElementById('cPage')
         

         pageFlip.on('flip',(e)=>{
             currPage.innerText=`[ ${e.data+1}`
         })

        
        
      
        
        
         return pageFlip
    },[])

    
        const dynamicPage = ()=>{

            if(pageF!=null){          
                pageF.flip(link-1,"top")
            }
        }
    
    
   
   
    return (
        <> 
          <div className={styles.bookMainC}>
            <div id="book" > 
                <div className={`my-page ${styles.bookCover} cover`}  data-density="hard" >
                 <h1>Book cover</h1>
                </div>
                <div className={`my-page ${styles.pageBorder}`}  >
                    <img src="Images/1.png" className={styles.image} />
                </div>
                <div className={`my-page ${styles.pageBorder}`}  >
                    <img src="Images/1.png" className={styles.image} />
                </div>
                <div className={`my-page ${styles.pageBorder}`}  >
                    <img src="Images/1.png" className={styles.image} />
                </div>
                <div className={`my-page ${styles.pageBorder}`}  >
                    <img src="Images/1.png" className={styles.image} />
                </div>
               
                <div className={`my-page cover ${styles.bookCover}`}  data-density="hard">
                    Last page
                </div>
            </div>
            <div className={styles.bookInfo}>
                  <button id="prvBtn">Prev</button>
                  <p id="cPage">[ 1</p>
                  <p>of</p>
                  <p id="tPages">5</p>
                  <button id="nexBtn">Next</button>

            </div>

            
          </div>

          <button onClick={dynamicPage}>Click</button>
         
        </>
    );
}

export default Book;