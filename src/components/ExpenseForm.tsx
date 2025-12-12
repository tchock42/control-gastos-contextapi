import { categories } from "../data/categories"
import DatePicker from "react-date-picker";                     // libreria para desplegar calendario
import 'react-calendar/dist/Calendar.css';                      // css de react-date-picker
import 'react-date-picker/dist/DatePicker.css';                 // css de react-calendar
import { useEffect, useState } from "react";
import { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

const ExpenseForm = () => {

    const [expense, setExpense] = useState<DraftExpense>({      // state local | usa el type DraftExpense para expense. Aqui se guarda la información del formulario modal
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })
    const [error, setError] = useState('')                      // inicializa un state de error

    const {state, dispatch, remainingBudget} = useBudget();                     // trae el state y dispatch del Provider
    const [previousAmount, setPreviousAmount] = useState(0);                    // referencia del gasto editado
    // useEffect para detectar un gasto para editar
    useEffect(() => {                                           // espera a un cambio en editingExpense
        if(state.editingId){                                    // si editingExpense contiene algo
            // filtrar gasto a editar
            const editingExpense = state.expenses.filter( currentExpense => currentExpense.id === state.editingId)[0]

            setExpense(editingExpense)                          // cambia el state con el gasto a editar
            setPreviousAmount(editingExpense.amount)            // guarda el gasto que se está actualizando
        }
    }, [state.editingId]);  

    //handleChange para los input del formulario de gasto
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        // console.log(e.target.value)
        const {name, value} = e.target
        const isAmountField = ['amount'].includes(name)         // evalua si se tecleó en cantidad
        
        setExpense({                                            // escribe en el state expense
            ...expense,                                         // mantiene el state de expense y lo copia
            [name]: isAmountField ? +value : value              // escribe en expenseName: o amount: el value o el +value o category como value (string)
        })
    }
    // handleChange para el input Date Picker
    const handleChangeDate = (value: Value) => {
        setExpense({                                            //escribe en el state, copia expense y sobreescribe en date
            ...expense,
            date: value
        })
    }

    //funcion para envío del formulario y reinicio del formulario o cerrar modal
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()                                      // evita que se recargue la pagina
        //validar que no esté vacío algún input
        if(Object.values(expense).includes('')){                // si algun elemento está vacío
            setError('Todos los campos son obligatorios.')
            return                                              // sale de la funcion para no ejecutar lo siguiente
        }
        //validar que no se pase del límite
        if(expense.amount  > (remainingBudget + previousAmount) ){                // agrega al presupuesto restante el valor del gasto editado
            setError('El gasto sobrepasa el limite del presupuesto')
            return                                              // sale de la funcion para no ejecutar lo siguiente
        }

        //pasa la validación. Se agrega O ACTUALIZA el gasto
        if(state.editingId){                                    // editingId indica que hay que actualizar
            dispatch({type: 'update-expense', payload:{expense: {id: state.editingId, ...expense}}})
        }else{
            dispatch({type: 'add-expense', payload: {expense}}) //ejecuta el action add-expense y entrega el state expense
        }
        

        //reiniciar el state
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })
        setPreviousAmount(0)                                    // reinicia el auxiliar de gasto anterior
    }
    return (
        <form className="space-y-5" onSubmit={handleSubmit}>            {/** Añade espacio a cada espacio de los elementos hijos */}
            <legend 
                className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
                {state.editingId ? 'Editar Gasto' : 'Nuevo Gasto'}      {/** Muestra condicionalmente el título */}
            </legend>
            {/** Aqui se coloca el error o alerta */}
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">               {/**input 1 */}
                <label  
                    htmlFor="expenseName"                       //ligar al id del input
                    className="text-xl"
                >Nombre del Gasto:</label>

                <input 
                    type="text" 
                    id="expenseName"
                    placeholder="Añade el nombre del gasto"
                    className="bg-slate-100 p-2"
                    name="expenseName"                          //se usa en el reducer
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">               {/**input 2 */}
                <label
                    htmlFor="amount"                            //ligar al id del input
                    className="text-xl"
                >Cantidad:</label>

                <input 
                    type="number" 
                    id="amount"
                    placeholder="Añade la cantidad del gasto: ej. 300"
                    className="bg-slate-100 p-2"
                    name="amount"                               // se usa en el reducer
                    value={expense.amount}                      // cantidad escrita
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">               {/** input 3 */}
                <label
                    htmlFor="category"                          //ligar al id del input
                    className="text-xl"
                >Categoría:</label>

                <select 
                    id="category"
                    className="bg-slate-100 p-2"
                    name="category"                             //se usa en el reducer
                    value={expense.category}                    // categoria seleccionada del select
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione --</option>
                    {categories.map( category => (
                        <option 
                            value={category.id}
                            key={category.id}
                        >{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">               {/**input 3  con DatePicker*/}
                <label
                    htmlFor="amount"                            //ligar al id del input
                    className="text-xl"
                >Fecha del gasto:</label>

                <DatePicker                                     // calendario de date picker
                    className="bg-slate-100 p-2 border-0"
                    value={expense.date}
                    onChange={ handleChangeDate}
                />
            </div>

            <input                                              //boton
                type="submit" 
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'}
            />
        </form>
    )
}

export default ExpenseForm
