import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"

const BudgetForm = () => {

    const [budget, setBudget] = useState(0)                             // state local para validar el presupuesto
    const {dispatch} = useBudget()                                      // importa el dispatch del context

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }

    const isValid = useMemo(() => {                                     // funcion para validar state local budget
        return isNaN(budget) || budget <= 0
    }, [budget])

    //handle submit para el form
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()  
        dispatch({type:'add-budget', payload:{budget}})                 // ejecuta add-budget y el state local budget
    }
    return (
        <form action="" className='space-y-5' onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">                           {/** primer input */}
                <label htmlFor="budget" className='text-4xl text-blue-600 font-bold text-center'>
                    Definir Presupuesto
                </label>
                <input 
                    type="number" 
                    id='budgetID' 
                    className="w-full bg-white border border-gray-200 p-2"
                    value={budget}                                              //toma el valor del state para mostrarlo
                    onChange={handleChange}
                />
            </div>  
            <input 
                type="submit" 
                value='Definir Presupuesto' 
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40" 
                disabled={isValid}
            />
        </form>
    )
}

export default BudgetForm
