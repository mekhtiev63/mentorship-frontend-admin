export async function mockDelay(ms = 400): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms))
}
