import { formatCurrency } from "../helpers"

type AmountDisplayProps = {                                       // tipado de props
  label?: string                                                  // opcional, no usado en ExpenseDetail
  amount: number
}

//despliega la cantidad de dinero
const AmountDisplay = ({label, amount}: AmountDisplayProps) => {
  return (
    <p className="text-2xl text-blue-600 font-bold">
      
      {label && `${label}: `}                                      {/** Despliega la etiqueta de la cantidad */}
      <span className="font-black text-black">{formatCurrency(amount)}</span>
    </p>
  )
}

export default AmountDisplay
