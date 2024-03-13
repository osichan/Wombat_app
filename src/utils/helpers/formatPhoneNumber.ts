export default function formatPhoneNumber(phoneNumberString: string) {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");

  var match = cleaned.match(/^(38|)?(\d{3})(\d{2})(\d{2})(\d{3})/);
  if (match) {
    var intlCode = match[1] ? "+38 " : "";
    return [
      intlCode,
      "(",
      match[2],
      ") ",
      match[3],
      "-",
      match[4],
      " ",
      match[5],
    ].join("");
  }
  return null;
}
