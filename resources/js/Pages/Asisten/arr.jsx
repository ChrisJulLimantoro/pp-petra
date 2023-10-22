export let dataLowongan = [
    {
        // id: "SD4",
        hari: "Senin",
        jam: "07.30 - 10.30",
        mata_kuliah_praktikum: "Struktur Data",
        kelas: "D",
        jumlah_asisten: 2,
        daftar_pengajar: ["Jessica "],
    },
    {
        // id: "DAA4",
        hari: "Kamis",
        jam: "16.30 - 19.30",
        mata_kuliah_praktikum: "Desain dan Analisis Algoritma",
        kelas: "D",
        jumlah_asisten: 3,
        daftar_pengajar: ["CJ ", "Karen "],
    },
    {
        // id: "BDL1",
        hari: "Senin",
        jam: "15.30 - 18.30",
        mata_kuliah_praktikum: "Basis Data Lajutan",
        kelas: "A",
        jumlah_asisten: 2,
        daftar_pengajar: ["Jessica "],
    },
    {
        // id: "DAA2",
        hari: "Selasa",
        jam: "07.30 - 10.30",
        mata_kuliah_praktikum: "Desain dan Analisis Algoritma",
        kelas: "B",
        jumlah_asisten: 3,
        daftar_pengajar: ["CJ ", "Acto "],
    },
];

export let dataAjar = [
        {
            // id: "SD1",
            hari: "Rabu",
            jam: "16.30 - 19.30",
            mata_kuliah_praktikum: "Struktur Data",
            kelas: "A",
            jumlah_asisten: "2",
            daftar_pengajar: ["Leo ", "CJ"],
        },
        {
            // id: "BD1",
            hari: "Kamis",
            jam: "16.30 - 19.30",
            mata_kuliah_praktikum: "Basis Data",
            kelas: "A",
            jumlah_asisten: "2",
            daftar_pengajar: ["Leo ", "CJ"],
        },
    ];
   export const updateDataLowongan = (updatedData) => {
       console.log("Updating dataLowongan:", updatedData);
       dataLowongan.length = 0;
       Array.prototype.push.apply(dataLowongan, updatedData);
       dataLowongan = [...updatedData];
   };

   export const updateDataAjar = (updatedData) => {
       console.log("Updating dataAjar:", updatedData);
       dataAjar.length = 0;
       Array.prototype.push.apply(dataAjar, updatedData);
       dataAjar = [...updatedData];
   };

export default {
    dataLowongan,
    dataAjar,
    updateDataLowongan,
    updateDataAjar,
};
