import React, {createContext, useState, useRef, useEffect,useCallback} from 'react';

import {io} from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();
const socket = io('http://localhost:5001');


const ContextProvider = ({children}) =>{
    const [stream, setStream] = useState();

    const [me, setMe] = useState('');
    const [name, setName] = useState('');

    const [call,setCall] = useState({});

    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);

    // 使用ref响应式填充video
    const myVideo = useRef();
    const userVideo = useRef(null);
    const connectionRef = useRef();

    // // 在useEffect时，获取权限
    // useEffect(() =>{
    //     // #1 navigatorAPI Promise then catch写法（R18非严格模式下，无效）
    //     navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    //     .then((currentStream) => {
    //         console.log(currentStream);
    //         setStream(currentStream);
    //         if (myVideo.current) {
    //             myVideo.current.srcObject = currentStream;
    //         }
    //     })
    //     .catch((err)=> console.log(err));

    //     // #2 try catch await写法（无效）
    //     // const getUserMedia = async() =>{
    //     //     try {
    //     //         const currentStream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
    //     //         myVideo.current.srcObject = currentStream;
    //     //     } catch (error) {
    //     //         console.log(error)
    //     //     }
    //     // }
    //     // getUserMedia();
        
    //     socket.on('me',(id)=> setMe(id));
    //     socket.on('callUser',({from, name: callerName, signal})=>{
    //         setCall({isReceivedCall: true, from, name:callerName,signal})
    //     })
    // },[])

    // #3.方案3 用useCallback()再做优化
    const getMediaStream = useCallback(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then((stream) => {
            console.log('Stream:', stream);
            setStream(stream);
            if (myVideo.current) {
                myVideo.current.srcObject = stream;
            }
          })
          .catch((error) => console.error(error));
      }, [myVideo]);
    
    useEffect(() => {
        getMediaStream();
        socket.on('me',(id)=> setMe(id));
        socket.on('callUser',({from, name: callerName, signal})=>{
            setCall({isReceivedCall: true, from, name:callerName,signal})
    })
    }, [getMediaStream]);

    const answerCall = ()=>{
        setCallAccepted(true);
        
        const peer = new Peer({initiator: false, trickle:false, stream});
        
        peer.on('signal',(data)=>{
            socket.emit('answerCall',{signal: data, to: call.from})
        })
        peer.on('stream',(currentStream)=>{
            userVideo.current = currentStream;
        })
        peer.signal(call.signal);
        connectionRef.current = peer;
    }
    const callUser = (id)=>{
        const peer = new Peer({initiator: true, trickle:false, stream});
        
        peer.on('signal',(data)=>{
            socket.emit('callUser',{userToCall:id, signalData:data, from:me, name})
        })
        
        peer.on('stream',(currentStream)=>{
            userVideo.current = currentStream;
        })

        socket.on('callAccepted',(signal)=>{
            setCallAccepted(true);
            peer.signal(signal);
        })
        connectionRef.current = peer;
    }
    const leaveCall = ()=>{
        setCallEnded(true);
        connectionRef.current.destroy();
        window.location.reload();
    }
    return(
        <SocketContext.Provider value={{
            call,callUser,callAccepted,callEnded,
            leaveCall,answerCall,
            name,setName,me,myVideo,userVideo,stream,
        }}>
            {children}
        </SocketContext.Provider>
    )
}
export {ContextProvider, SocketContext};