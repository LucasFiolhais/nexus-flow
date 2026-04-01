export const useFormatter = () => {
  const formatDate = (dateInput: string | Date): string => {
    const date = new Date(dateInput)

    return new Intl.DateTimeFormat('pt-PT', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date)
  }

  return {
    formatDate
  }
}
