import { Category, DraftExpense, Expense } from "../types"
import { v4 as uuidv4} from 'uuid'

export type BudgetActions =
    { type: 'add-budget', payload: { budget: number} } |        // agregar el presupuesto al state
    { type: 'show-modal' } |                                    // mostrar el modal
    { type: 'close-modal' } |                                   // cerrar el modal
    { type: 'add-expense', payload: {expense: DraftExpense}} |  // accion para agregar un nuevo gasto sin id
    { type: 'remove-expense', payload: {id: Expense['id']}} |   // eliminar gasto usando un type de id de Expense
    { type: 'get-expense-by-id', payload: {id: Expense['id']}} |// guardar en el state el id a editar
    { type: 'update-expense', payload: {expense: Expense}} |    // guardar en el state el gasto actualizado
    { type: 'restart-app'} |
    { type: 'add-filter-category', payload: {id: Category['id']}}   // selecciona una categoría para filtrar el listado
    

export type BudgetState = {
    budget: number,                                             // presupuesto validado
    modal: boolean                                              // abrir modal
    expenses: Expense[]                                         // array de gastos 
    editingId: Expense['id']                                    // estado de id para eliminar
    currentCategory: Category['id']
}

/**Local Storage */ 
const localStorageBudget = (): number =>{                       // retorna un tipo number     
    const budget = localStorage.getItem('budget');
    return budget ? +budget : 0                                 // su budget tiene algo retorna de LS en number, si no inicia en 0
}
const localStorageExpenses = () : Expense[] => {                // retorna un tipo Expense[]
    const expenses = localStorage.getItem('expenses')
    return expenses ? JSON.parse(expenses) : []                 // retorna los gastos o []
} /** Termina local storage */

export const initialState: BudgetState = {
    budget: localStorageBudget(),                                                  // valor inicial 0
    modal: false,                                               // modal no se muestra
    expenses: localStorageExpenses(),                           // valor inicial del array con los gastos extrae de LS como array de gastos o [] tipo Expense[]
    editingId: '',                                               // id a editar
    currentCategory: ''
}

//funcion para agregar el id al Draft de gasto
const createExpense = (draftExpense: DraftExpense) : Expense => {                       // toma el payload como el gasto borrador | toma un DraftExpense y devuelve un Expense
    return {                                                                            // devuelve el gasto con un nuevo atributo id
        ...draftExpense,
        id: uuidv4()                                                                    // funcion de uuid
    }
}

export const budgetReducer = (
        state: BudgetState = initialState,
        action: BudgetActions
    ) => {
        //agregar el presupuesto
        if(action.type === 'add-budget'){

            return{                             //retorna el state y actualiza budget
                ...state,
                budget: action.payload.budget
            }
        }

        //abrir modal
        if(action.type === 'show-modal'){

            return{
                ...state,
                modal: true
            }
        }
        // cerrar modal
        if(action.type === 'close-modal'){

            return{
                ...state,
                modal: false,
                editingId: ''
            }
        }

        // agregar gasto sin id
        if(action.type === 'add-expense'){

            //agrega el id creando un nuevo expense
            const expense = createExpense(action.payload.expense)       // añade el id

            return{
                ...state,                                               // copia el state
                expenses: [...state.expenses, expense],                 // copia el array de gastos y agrega un nuevo gasto
                modal: false                                            // cierra el modal al cambiar el state
            }           
        }

        // eliminar gasto
        if(action.type === 'remove-expense'){
            return{
                ...state,
                expenses: state.expenses.filter(expense => expense.id !== action.payload.id)    // devuelve todos los gastos diferentes al seleccionado
            }
        }

        // obtener id del elemento a editar
        if(action.type === 'get-expense-by-id'){
            return{
                ...state,
                editingId: action.payload.id,               // agrega el id a editar en el state global
                modal: true                                 // abre el modal para editar el gasto
            }
        }

        // actualizar teniendo el id para actualizar
        if(action.type === 'update-expense'){
            return{
                ...state,
                expenses: state.expenses.map( expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),  // si el id del gasto actual es igual al id del formulario enviado
                modal: false,            
                editingId: ''
            }
        }

        //reiniciar app
        if(action.type==='restart-app'){

            return{
                ...state,
                budget: 0,
                modal: false,
                expenses: [],
                editingId: ''
            }
        }

        if(action.type ==='add-filter-category'){
            return{
                ...state,
                currentCategory: action.payload.id
            }
        }
        return state
}