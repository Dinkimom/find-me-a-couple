export enum PATHS {
  HOME = '/',
  LOGIN = '/account/form',
  DATES = '/dates',
  CHATS = '/chats',
  CHAT = '/chats/:receiver',
  NOT_FOUND = '/not-found',
}

export const checkPathname = (pathname: string, shouldBe: PATHS) => {
  if (shouldBe === PATHS.NOT_FOUND) {
    return false;
  }

  const PATH_MASKS = {
    [PATHS.HOME]: /\//,
    [PATHS.LOGIN]: /\/account\/form/i,
    [PATHS.DATES]: /\/dates/i,
    [PATHS.CHATS]: /\/chats/i,
    [PATHS.CHAT]: /\/chats\/(\w|\d)+/i,
  };

  return PATH_MASKS[shouldBe].test(pathname);
};
