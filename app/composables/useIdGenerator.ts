export const useUtils = () => {
  const generateId = (): string => {
    return crypto.randomUUID()
  }

  return {
    generateId
  }
}
