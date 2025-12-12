import { useMemo } from "react"
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list';                  // importa dependencias de react-swipeable-list
import "react-swipeable-list/dist/styles.css";  // importa estilos de react-swipeable-list
import { formatDate } from "../helpers"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget";

type ExpenseDetailProps = {
    expense: Expense
}

export default function ExpenseDetail({expense}: ExpenseDetailProps) {
    const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category), [expense])[0]        //crea un elemento de arreglo filtrado igual al id igual al category del gasto
    const {dispatch} = useBudget()

    // componente de leadingActions
    const leadingActions = () => (              // ( para no usar return
        <LeadingActions>
            <SwipeAction
                onClick={() => dispatch({type: 'get-expense-by-id', payload: {id: expense.id}})}
            >
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )

    // componente de trailingActions
    const trailingActions = () => (              // ( para no usar return
        <TrailingActions>
            <SwipeAction
                onClick={() => dispatch({type:'remove-expense', payload:{id:expense.id}})}  // ejecuta el action de eliminar
                destructive={true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={30}                   // cantidad de pixeles para la accion
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
                    <div>                       {/** icono de la categoria */}
                        <img src={`/icono_${categoryInfo.icon}.svg`} alt="icono gasto" className='w-20' />
                    </div>
                    <div className="flex-1 space-y-2">                                      {/** flex: 1 1 0% toma todo el ancho disponible y agrega margen entre hijos */}
                        <p className='text-sm text-slate-500 font-bold uppercase'>{categoryInfo.name}</p>               {/** categoria del gasto */}
                        <p>{expense.expenseName}</p>
                        <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>                {/** fecha del gasto */}
                    </div>

                    <AmountDisplay
                        amount = {expense.amount}
                    />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
