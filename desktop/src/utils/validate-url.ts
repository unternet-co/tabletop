export function validateURL(input: string): string | false {
  const trimmedInput = input.trim();

  if (trimmedInput.split(' ').length > 1) return false;
  if (trimmedInput.length < 3) return false;

  let url: URL;

  try {
    url = new URL(trimmedInput);
  } catch {
    try {
      url = new URL(`https://${trimmedInput}`);

      const parts = url.hostname.split('.');
      if (
        parts.length < 2 ||
        !parts.every((part) => part.length > 0) ||
        parts.at(-1).length < 2
      ) return false;
    } catch {
      return false;
    }
  }

  return url.href;
}