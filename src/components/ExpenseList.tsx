import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

const ExpenseList = () => {

    const {state} = useBudget()                                                         // importa el state de reducer
    
    // array filtrado se crea si existe un currentCategory
    const filteredExpenses = state.currentCategory ? state.expenses.filter( expense => expense.category === state.currentCategory ) : state.expenses

    const isEmpty = useMemo(() => filteredExpenses.length === 0, [state.expenses])        // evalua si el array de gastos está vacío
    return (
        <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
            {isEmpty ? <p className="text-gray-600 text-2xl font-bold">No hay gastos</p> 
            : (
                <>
                    <p className="text-gray-600 text-2xl font-bold">Listado de Gastos</p>
                    {filteredExpenses.map( expense => (                                   // con ( no requiere return 
                        <ExpenseDetail
                            expense = {expense}
                            key = {expense.id}
                        />
                    ))}
                </>
            )}
        </div>
    )
}

export default ExpenseList
