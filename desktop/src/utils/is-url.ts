export function url(input: string): string | false {
  const trimmedInput = input.trim();
  let url: URL;

  try {
    url = new URL(trimmedInput);
  } catch {
    try {
      url = new URL(`https://${trimmedInput}`);
    } catch {
      return false;
    }
  }

  return url.href;
}