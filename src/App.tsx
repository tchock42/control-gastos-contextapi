import { useEffect, useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterByCategory from "./components/FilterByCategory"

function App() {
  const {state} = useBudget()                                         // importa el state del context

  // detectar cambio en presupuesto y validarlo
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

  // guardar en localStorage
  useEffect(() => {                                                   // espera cambio en presupuesto o gastos
    localStorage.setItem('budget', JSON.stringify(state.budget))      // guarda en budget
    localStorage.setItem('expenses', JSON.stringify(state.expenses))  // guarda en expenses
  }, [state.budget, state.expenses]);
  
  return (
    <>
      <header className="bg-blue-600 py-6 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Planificador de Gastos
        </h1>
      </header>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {/* Despliega el administrador o el formulario */}
        {isValidBudget ?  <BudgetTracker/> : <BudgetForm/>}
      </div>

      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">    {/** Agrega un max-width: 48rem, margin-left:auto margin-right: auto y padding-top:2.5rem padding-bottom: 2.5rem */}
          <FilterByCategory/>
          <ExpenseList/>                              {/** Listado de gastos */}
          <ExpenseModal/>                             {/** Modal de nuevo gasto */}
        </main>
        
      )}
      
    </>
  )
}

export default App
