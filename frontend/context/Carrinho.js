import React , {createContext, useState , useContext} from "react";

const CarrinhoContext = createContext();

export default function CarrinhoProvider({children}){
    
    const[carrinho ,setCarrinho] = useState([]);
    
    return(
        <CarrinhoContext.Provider
            value={{
                carrinho,
                setCarrinho
            }}
        >
        {children}

        </CarrinhoContext.Provider>   
    )
}
export function useCarrinho(){
    const context = useContext(CarrinhoContext);
    const { carrinho, setCarrinho} = context;
    return { carrinho, setCarrinho };
}