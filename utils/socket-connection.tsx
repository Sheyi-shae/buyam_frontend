// import { useEffect, useRef, useState } from "react";
// import { Socket, io } from "socket.io-client";

// export function useSocket(userId: number | null |undefined) {
//   const socketRef = useRef<Socket | null>(null);
//   const [isConnected, setIsConnected] = useState(false);


//   useEffect(() => {
//     if (!userId) {
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//         socketRef.current = null;
//        // setIsConnected(false);
//       }
//       return;
//     }

//     const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
//       withCredentials: true,
//       transports: ["websocket", "polling"],
//       autoConnect: true,
//       reconnection: true,
//       reconnectionAttempts: Infinity,
//       reconnectionDelay: 1000,
//       query: { userId }
//     });

//     socketRef.current = socket;
  
//      socket.on("connect", () => {
//       console.log("Connected:", socket.id);
//       setIsConnected(true);     // <-- safe in callback
//     });

//     socket.on("disconnect", () => {
//       console.log("Disconnected");
//       setIsConnected(false);    // <-- safe in callback
//     });
//     return () => { socket.disconnect(); }
    
  
//   }, [userId])
  
 

//   return { socketRef, isConnected };
// }
