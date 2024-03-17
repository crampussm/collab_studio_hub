import React, {createContext, useContext, useState} from "react";

const Context = createContext(null);

export const useGetContext = () => {
    const socket = useContext(Context);
    return socket;
};

export const ContextProvider = (props)=>{
    const [workspace, setWorkspace] = useState({workspaceId: '', workspaceName: ''});
    return (
        <Context.Provider value={{workspace, setWorkspace}}>
          {props.children}
        </Context.Provider>
      );
}