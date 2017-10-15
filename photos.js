const fs = require('fs');
const os = require('os');
const config = require('./config.js');

const steps = [
    "Podaj folder docelowy",
    //"Numery zdjęć do wywołania (po przecinku)"
];

// Gdy folder docelowy nie jest skonfigurowany
if (config.destFolder === '') {
    process.stdout.write(`\n${steps[0]}:\n`);
    process.stdout.write("  >  ");
}

fs.lstat(config.destFolder + '/do przegrania', function (err, stats) {
    if (err && err.code === 'ENOENT') {
        // jeśli katalog nie istnieje
        fs.mkdir(config.destFolder + '/do przegrania', function () {});
    } else {
        // jeśli katalog istnieje
        let timeStamp = Date.now();
        fs.rename(
            config.destFolder + '/do przegrania',
            config.destFolder + timeStamp + '_do przegrania',
            function (err) {
                if (err) throw err;
                fs.mkdir(config.destFolder + '/do przegrania', function () {});
            }
        );
    }
});



//
// let photos = [];
// function goToStep(step) {
//     process.stdout.write(`\n\n${steps[step]}:\n`);
//     process.stdout.write("  >  ");
// }
//
//
// process.stdin.on('data', function(data) {
//     photos.push(data.toString().trim());
//
//     if (photos.length < steps.length) {
//         goToStep(photos.length);
//     } else {
//         process.exit();
//     }
// });
//
// process.on('exit', function(data) {
//     process.stdout.write(`\n....\n\nKatalog ze zdjęciami: ${photos[0]}\n`);
//     process.stdout.write(`\n....\n\nLista zdjęć: ${photos[1]}\n\n...\n`);
// });
//
// goToStep(0);


/**
* co robi: Zmienia nazwę pliku
* co zwraca:
* - null jeśli zmiana zakończyła się sukcesem
* - obiekt err jeśli nastąpił błąd
*/
// fs.rename('./IMG_tmp1.txt', './tmp1.txt', function (err) {
//     console.log(err);
// })



// fs.lstat('tmp', function (err, stats) {
//     console.log(stats);
// });

// fs.readdir('./', function (err, files) {
//     if (err) return false;
//
//     for (let i = 0; i < files.length - 1; i = i + 1) {
//         let oldPath = files[i];
//         let newPath = 'IMG_' + oldPath;
//
//         fs.rename(oldPath, newPath, function (err) {
//             console.log(err);
//         });
//     }
// });

/**
    TODO

    * 1. podanie listy plików ze zdjęciami do wywołania
    * a. pole do wypisywania listy plików, np po przecinku np: kotek, piesek, pi.
    * b. sprawdzić czy jest jakaś funkcja 'read line' czy tym podobne
    * 2. sprawdzić czy plik istnieje
*/

/*sandbox*/
