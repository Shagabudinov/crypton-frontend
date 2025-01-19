// Функция для установки куки с истечением в секундах
export function setCookie(name:string, value:string, seconds:number) {
  const expires = seconds
    ? '; expires=' + new Date(Date.now() + seconds * 1000).toUTCString()
    : '';
  document.cookie =
    name + '=' + encodeURIComponent(value) + expires + '; path=/';
}

//setCookie('authToken', token, 3600); // Кука будет жить 3600 секунд (1 час)


// Функция для получения куки по имени
export function getCookie(name:string) {
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");
}

//const token = getCookie("authToken"); Получение jwt токена


// Функция для удаления куки по имени
export function deleteCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}
