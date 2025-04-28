const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getUsia = async () => {
  const usias = [];

  for (let i = 1; i <= 5; i++) {
    const usia = await new Promise((resolve) =>
      readline.question(`Masukkan usia ke-${i}: `, resolve)
    );
    usias.push(Number(usia));
  }

  readline.close();
  return usias;
};

const kelompokkanData = (data) => {
  let anak = 0;
  let remaja = 0;   
  let dewasa = 0;
  let lansia = 0;

  for (let i = 0; i < data.length; i++) {

    if (data[i] <= 12) {      
      anak++;
    } else if (data[i] >= 13 && data[i] <= 17) {      
      remaja++;
    } else if (data[i] >= 18 && data[i] <= 59) {      
      dewasa++;
    } else {      
      lansia++;
    }
  }
  
  return `Anak-anak: ${anak + " orang"},
Remaja: ${remaja + " orang"},
Dewasa: ${dewasa  + " orang"},
Lansia: ${lansia + " orang"}` 
  ;
};

const main = async () => {
  const data = await getUsia();
  const result = kelompokkanData(data);
  
  console.log(result);
};

main()
