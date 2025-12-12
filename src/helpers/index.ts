/**Funcion para formatear cantidades a moneda */
export function formatCurrency(amount: number){ //toma amount y se hace export
    return new Intl.NumberFormat('en-US', {     //instancia de clase Intl y metodo NumberFormat
        style: 'currency',                      //objeto de personalización
        currency: 'USD'
    }).format(amount)                           //funcion format
}

/** funcion para formatear fechas de react date picker */
export function formatDate(dateStr: string) : string{
    const dateObj = new Date(dateStr)           // toma el elemento string y lo convierte a tipo fecha
    const options: Intl.DateTimeFormatOptions = {   //crea el objeto de opciones
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return new Intl.DateTimeFormat('es-ES', options).format(dateObj)    //retorna la fecha formateada de acuerdo a options
}