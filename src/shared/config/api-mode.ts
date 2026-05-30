/** When true, services use in-memory mocks; set VITE_USE_MOCK=false for future HTTP integration. */
export const useMockApi =
  import.meta.env.VITE_USE_MOCK !== 'false' && import.meta.env.VITE_USE_MOCK !== '0'
