import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/responsive.module.css'
import { auth, realtimeDb } from '../backend/firebase/firebase';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState} from 'react';
import Book from './NMyBook';


import { faPen, faArrowLeft, faBars, faChevronLeft, faChevronRight, faCog, faExpandAlt, faExpandArrowsAlt, faPaintBrush, faSearch, faShareAlt, faSignOutAlt, faStickyNote, faThLarge, faUserAlt, faUserCog } from '@fortawesome/free-solid-svg-icons';


export default function Layout({link}) {

    const [user, setUser] = useState(null)


    auth.onAuthStateChanged((user) => {
        if (user) {
            setUser(user)
            setUserId(user.uid)

        } else (
            setUser(null)
        )
    })


    const Router = useRouter()

    let DropMenu = () => {
        let aks = document.getElementById('thirdContainer')
        if (aks.style.display == "none") {
            aks.style.display = "block"
        }
        else {
            aks.style.display = "none"
        }

    }
    const UserVerify = (e) => {
        { user ? Router.push('/userdashboard') : Router.push('/login') }
    }



    const [cdState, setDState] = useState('none')
    const Edit = () => {
        if (cdState === 'none') {
            setDState('block')
        } else {
            setDState('none')
        }
    }

    // Highlighter code for Selection ********************************************************************************
    const [pageNo, setPageNo] = useState(1)
    const [userId, setUserId] = useState('')
    const [SX, setSX] = useState(0)
    const [SY, setSY] = useState(0)
    const [arrObj, setarrObj] = useState([])
    
    const mouseDownEvent = (e) => {

        let SXVal = Math.round((e.nativeEvent.layerX / 330) * 100);
        let SYVal = Math.round((e.nativeEvent.offsetY / 500) * 100);
        setSX(SXVal)
        setSY(SYVal)


    }

    const highlightImg = () => {
        realtimeDb.ref("/highlight " + userId).get().then((snapshot) => {
            let data = snapshot.val()
            
            if(data!=null){
                setarrObj([])
                let keys = Object.keys(data)     
                console.log(keys);          
                for(let i = 0 ; i<keys.length ; i++){
                    let temp = []
                    temp = arrObj
                    temp.push(data[keys[i]]) 
                    setarrObj(temp)
                    console.log(temp);
         
                 }
            }

        })
    }

    const mouseUpEvent = (e) => {
        let EXVal = Math.round((e.nativeEvent.offsetX / 330) * 100)
        console.log("SX " + SX);
        console.log("SY " + SY);
        console.log(EXVal);


        realtimeDb.ref("/highlight " + userId).push({
            SXV: SX,
            SYV: SY,
            EXV: EXVal
        })

        highlightImg()
        Router.push('/')
        console.log(arrObj);
    }

    const test = ()=>{
        let ak = arrObj.length;
        arrObj.splice(0,ak)
        realtimeDb.ref("/highlight " + userId).remove();
        console.log(ak)
        Router.push('/')

    }



    return (

        <>




            <div className={`${styles.mainContainer}`} >

                <div className={`d row h-100`}>
                    <div className={` ${styles.leftBox} text-center d-flex flex-column justify-content-between col-1`} >
                        <div id='hamburger' className={`d-flex flex-column justify-content-center align-items-center my-3`}>
                            <div onClick={DropMenu} className={`${styles.hamburger}`} ><FontAwesomeIcon icon={faBars} size='lg' className={`${styles.hamburger}`} /></div>
                            <FontAwesomeIcon icon={faStickyNote} size='lg' className={`${styles.iconCol}`} ></FontAwesomeIcon>
                            <FontAwesomeIcon icon={faCog} size='lg' className={`${styles.iconCol}`} onClick={test} ></FontAwesomeIcon>
                            <FontAwesomeIcon icon={faPen} size='lg' className={`${styles.iconCol}`} onClick={Edit}></FontAwesomeIcon>
                        </div>
                        <div className={`d-flex flex-column justify-content-center align-items-center my-3`} >
                            <FontAwesomeIcon icon={faUserAlt} size='lg' className={`${styles.iconCol}`} onClick={UserVerify}></FontAwesomeIcon>
                            <Link href="/signup"><a > <FontAwesomeIcon icon={faUserCog} size='lg' className={`${styles.iconCol}`} ></FontAwesomeIcon> </a></Link>
                            <FontAwesomeIcon icon={faSignOutAlt} size='lg' className={`${styles.iconCol}`} onClick={() => {
                                auth.signOut()
                            }} ></FontAwesomeIcon>
                        </div>

                    </div>
                    <div className={` text-center ${styles.middleContainer} col-8`}  >
                        <div className={`text-center text-white d-flex p-2 justify-content-center align-items-center w-auto border-radius rounded mx-auto mt-1 ${styles.topMenu} `} >
                            <div>
                                <FontAwesomeIcon icon={faShareAlt}></FontAwesomeIcon>
                            </div>
                            <div >
                                <input type="range" className={`form-range mx-1 w-75 my-1 `} id="customRange1" />
                            </div>
                            <div className={`mx-1 `}>
                                <FontAwesomeIcon icon={faExpandArrowsAlt}></FontAwesomeIcon>
                            </div>
                            <div className={`mx-1 `}>
                                <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
                                <input type="number" className={`w-25 mx-1 ${styles.topInput} `} ></input>
                                <span >/100</span>
                                <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                            </div>
                            <div>
                                <input type="search" className={`w-25 mx-1 rounded ${styles.topSearchInput} `} ></input>
                                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                            </div>

                        </div>
                             


                        <div style={{ position: "relative", top: "2.8%", width: "100%", height: "auto" }}>
                            <div className=" oddPages" style={{ display: cdState, height: "auto", position: "absolute", zIndex: "10", top: "10%", left: "17%" }}>
                                <img onMouseDown={mouseDownEvent} onMouseUp={mouseUpEvent} src="Images/1.png" style={{ width: "330px", height: "500px" }} alt="oddpages" draggable='false' />
                                {
                                    arrObj.map((val,keys)=>{
                                        return <div key={keys} style={{ position: 'absolute', top: val.SYV + "%", left: val.SXV + "%", width: val.EXV - val.SXV + "%", height: "4%", backgroundColor: "rgba(255, 99, 71, 0.6)",zIndex:'15' }} ></div>
                                    })
                                }
                            </div>
                            <div className=" EvenPages" style={{ display: cdState, height: "auto", position: "absolute", zIndex: "10", top: "10%", left: "50%" }}>
                                <img src="Images/1.png" style={{ width: "330px", height: "500px" }} alt="evenPages" draggable="false" />
                            </div>
                        </div>

                        <div className={` ${styles.bookContainer}`}>
                            <div >
                                 <Book link={link} />
                            </div>
                        </div>


                    </div>
                    <div id='thirdContainer' className={`py-2 px-4 text-white ${styles.thirdContainer} col-3`} >

                        <div className={`row `}>
                            <div className="col-6">
                                <div>
                                    <p >Arrow size</p>
                                </div>
                                <div>
                                    <p>Backgorund Color</p>
                                </div>
                                <div>
                                    <p>Border color</p>
                                </div>
                                <div>
                                    <p>Page Shadow</p>
                                </div>

                            </div>
                            <div className="col-6">
                                <div>
                                    <input type="range" className='my-2 w-50' />
                                </div>
                                <div>
                                    <input type="text" className='my-2 w-50 rounded' />
                                </div>
                                <div>
                                    <input type="text" className='my-2 w-50 rounded' />
                                </div>
                                <div>
                                    <input type="text" className='my-2 w-50 rounded' />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}