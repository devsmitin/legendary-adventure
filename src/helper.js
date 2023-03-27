export function randomUsername() {
  const d_obj = new Date(Date.now()),
    first_two = parseInt(Math.random() * 39) + 10,
    last_four =
      d_obj.getMilliseconds() +
      d_obj.getSeconds() +
      parseInt(Math.random() * 7999) +
      1000;

  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const random_letter = alphabets[Math.floor(Math.random() * alphabets.length)];

  return "dz_" + random_letter + first_two + "-" + last_four;
}
