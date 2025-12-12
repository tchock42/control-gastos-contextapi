export type Expense = {
    id: string
    expenseName: string
    amount: number
    category: string
    date: Value                                                 // usa el tipo de 
}

export type DraftExpense = Omit<Expense, 'id'>                  // Hereda de Expense quitando el id

type ValuePiece = Date | null;                                  // type del calendario date picker
export type Value = ValuePiece | [ValuePiece, ValuePiece];      // type del calendario date picker

export type Category = {                                        // type de categories
    id: string
    name: string
    icon: string
}