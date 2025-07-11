export function setCookie(
  name: string,
  value: string,
  options: {
    days?: number;
    path?: string;
    sameSite?: 'Strict' | 'Lax' | 'None';
    secure?: boolean;
  } = {}
): void {
  const {
    days = 7,
    path = '/',
    sameSite = 'Lax',
    secure = false,
  } = options;

  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  let cookieStr = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=${path}; SameSite=${sameSite}`;
  if (secure) cookieStr += '; Secure';
  document.cookie = cookieStr;
}



export function getCookie(name: string): string | null {
  const cookieString = document.cookie;
  const cookies = cookieString.split('; ').reduce((acc: Record<string, string>, current) => {
    const [key, value] = current.split('=');
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {});

  return cookies[name] || null;
}

export function removeCookie(
  name: string,
  options: {
    path?: string;
  } = {}
): void {
  const { path = '/' } = options;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
}

export function updateCookie(
  name: string,
  value: string,
  options?: {
    days?: number;
    path?: string;
    sameSite?: 'Lax' | 'Strict' | 'None';
    secure?: boolean;
  }
): void {
  // just calls setCookie with same name
  setCookie(name, value, options);
}

