import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Manager, Socket } from "socket.io-client";
import { wsSlice } from "~/store/slices/ws.slice";
import { getSocketOpened } from "~/store/selectors/ws.selector";

export type SocketContextValue = {
  manager: Manager;
  socket: Socket;
};

const SocketContext = createContext<SocketContextValue | null>(null);

export const SocketProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const socketStatus = useSelector(getSocketOpened);
  const [manager, setManager] = useState<Manager>();
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    setManager((prev) => {
      if (prev) return prev;
      return new Manager({
        autoConnect: false,
      })
    });
  }, []);

  useEffect(() => {
    if (manager && !["open", "opening"].includes(socketStatus)) {
      manager.open((err) => {
        if (err) {
          console.log(err);
        } else {
          dispatch(wsSlice.actions.setSocketsStatus(
            manager._readyState
          ));
          dispatch(wsSlice.actions.setOpenedSockets(true));
        }
      });

      const socket = manager.socket("/");
      socket.connect();

      setSocket(socket);
    }
  }, [dispatch, manager, socketStatus]);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        dispatch(wsSlice.actions.setClosedSockets(false));
        dispatch(wsSlice.actions.setOpenedSockets(true));
      });
      socket.on("disconnect", () => {
        dispatch(wsSlice.actions.setSocketsStatus(manager!._readyState));
        dispatch(wsSlice.actions.setClosedSockets(true));
        dispatch(wsSlice.actions.setOpenedSockets(false));
      })
    }
  }, [socket]);

  const value = useMemo(() => {
    return {
      socket: socket as Socket,
      manager: manager as Manager
    }
  }, [socket, manager])

  return (
    <SocketContext.Provider value={ value }>
      { children }
    </SocketContext.Provider>
  )
}

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error("useSocketContext should be initialized before");

  return context;
};