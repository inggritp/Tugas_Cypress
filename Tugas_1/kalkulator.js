const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getOperasi = async () => {
  const operasi = await new Promise((resolve) =>
    readline.question(
      `Masukkan operasi 
1. Penjumlahan 
2. pengurangan 
3. Perkalian 
4. Pembagian \nPilih (1, 2, 3, 4)>> ` ,
      resolve
    )
  );

  return operasi;
};

const getAngka = async () => {
  const angkas = [];

  for (let i = 1; i <= 2; i++) {
    const number = await new Promise((resolve) =>
      readline.question(`Masukkan angka ke-${i}: `, resolve)
    );
    angkas.push(Number(parseInt(number)));
  }

  return angkas;
};

const hitung = (operasi, angka) => {
  const [angka1, angka2] = angka;
  let hasil;

  switch (operasi) {
    case "1":
      hasil = angka1 + angka2;
      break;
    case "2":
      hasil = angka1 - angka2;
      break;
    case "3":
      hasil = angka1 * angka2;
      break;
    case "4":
      hasil = angka1 / angka2;
      break;
    default:
      hasil = "Operasi tidak valid";
  }

  return hasil;
};

const main = async () => {
  const operasi = await getOperasi();
  const angka = await getAngka();
  const result = hitung(operasi, angka);

  console.log(`Hasil ${result}`);
  readline.close();
};

main();