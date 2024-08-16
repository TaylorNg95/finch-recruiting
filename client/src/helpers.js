export function formatDate(date){
    const formattedDate = date.slice(-5) + '-' + date.slice(2, 4)
    return formattedDate
}