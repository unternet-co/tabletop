export function isURL(input: string): boolean {
  const trimmedInput = input.trim();

  try {
    new URL(trimmedInput);
  } catch {
    try {
      new URL(`https://${trimmedInput}`);
    } catch {
      return false;
    }
  }
}