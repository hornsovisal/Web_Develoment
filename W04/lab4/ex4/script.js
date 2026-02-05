function runEncrypt() {
  const text = document.getElementById("encPlain").value;
  const shift = parseInt(document.getElementById("encShift").value, 10) || 0;
  let result = "";

  for (let i = 0; i < text.length; i++) {
    let code = text.charCodeAt(i);

    // A–Z
    if (code >= 65 && code <= 90) {
      code += shift;

      while (code > 90) {
        code = 65 + (code - 91);
      }
    }
    // a–z
    else if (code >= 97 && code <= 122) {
      code += shift;

      while (code > 122) {
        code = 97 + (code - 123);
      }
    }

    result += String.fromCharCode(code);
  }

  document.getElementById("encResult").value = result;
}

function runDecrypt() {
  const text = document.getElementById("decCipher").value;
  const shift = parseInt(document.getElementById("decShift").value);
  let result = "";

  for (let i = 0; i < text.length; i++) {
    let code = text.charCodeAt(i);
    // A-Z
    if (code >= 65 && code <= 90) {
      code -= shift;
      while (code < 65) {
        code = 91 - (65 - code);
      }
    } else if (code >= 97 && code <= 122) {
      code -= shift;
      while (code < 97) {
        code = 123 - (97 - code);
      }
    }

    result += String.fromCharCode(code);
  }
  document.getElementById("decResult").value = result; 
}
