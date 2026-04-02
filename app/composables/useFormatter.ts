export const useFormatter = () => {
  const formatDate = (dateInput: any): string => {
    const date = new Date(dateInput)

    if (!dateInput || isNaN(date.getTime())) return 'Sem data'

    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return { formatDate }
}
