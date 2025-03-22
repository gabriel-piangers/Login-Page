export function validateEmail(email) {
  if (email.includes("@")) return true;
  return false;
}

export function validatePassword(password) {
  if (password.length < 8) return false;
  let [lower, upper, num] = [false, false, false];
  for (const char of password) {
    if (!isNaN(parseInt(char))) {
      num = true;
      continue;
    }
    if (!lower && char === char.toLowerCase()) lower = true;
    if (!upper && char === char.toUpperCase()) upper = true;
  }
  if (lower && upper && num) return true;
  return false;
}
