export function getTokenPayload(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload);
    return JSON.parse(decoded); // { exp, username, ... }
  } catch {
    return null;
  }
}

export function isTokenExpired(token) {
  const payload = getTokenPayload(token);
  if (!payload || !payload.exp) return true; // 유효하지 않은 토큰은 만료 처리

  const now = Math.floor(Date.now() / 1000); // 현재 시각 (초 단위)
  return payload.exp < now; // true면 만료됨
}
