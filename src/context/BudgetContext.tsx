import { createContext, useReducer, Dispatch, ReactNode, useMemo } from "react";
import { BudgetActions, BudgetState, budgetReducer, initialState } from "../reducers/budget-reducer";

/*creacion del PRovider del Context*/

//type del Context (state, dispatch, totalExpenses, etc, como origen de datos)
type BudgetContextProps = {             
    state: BudgetState,                 //dado por la firma de state
    dispatch: Dispatch<BudgetActions>   // dado por la firma de dispatch
    totalExpenses: number
    remainingBudget: number
}

//type del Provider (children)
type BudgetProviderProps = {
    children: ReactNode                 //type especial para children
}
export const BudgetContext = createContext<BudgetContextProps>({} as BudgetContextProps)    //generic del type del Context


//definición del Provider, toma el state y el dispatch del reducer como origen de datos
export const BudgetProvider = ({children}:BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)   //extrae el state del reducer 

    //calculos de totales
    const totalExpenses = useMemo( () => state.expenses.reduce( (total, expense) => expense.amount + total, 0), //espera para calcular el total de gastos
    [state.expenses])                                           
    const remainingBudget = state.budget - totalExpenses         // restante de presupuesto


    return (                                                            // información del Provider
        <BudgetContext.Provider                                         // Provider
            value={{                                
                state,
                dispatch,
                totalExpenses,
                remainingBudget
            }}
        >
            {children}                                                  {/** elementos de la app */}
        </BudgetContext.Provider>
    ); 
}