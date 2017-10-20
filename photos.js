const fs = require('fs');
const os = require('os');
const config = require('./config.js');

const steps = [
    "Podaj folder docelowy",
    "Numery zdjęć do wywołania (po przecinku)"
];

// Gdy folder docelowy nie jest skonfigurowany
if (config.destFolder === '') {
    process.stdout.write(`\n${steps[0]}:\n`);
    process.stdout.write("  >  ");
}

// Gdy katalog 'do przegrania' nie istnieje to zostaje utworzony
// Jeśli istnieje dodawany jest stempel czasowy do istniejacego katalogu
// i tworzony kolejny folder 'do przegrania'
fs.lstat(config.destFolder + '/do przegrania', function (err, stats) {
    if (err && err.code === 'ENOENT') {
        fs.mkdir(config.destFolder + '/do przegrania', function () {});
    } else {
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

process.stdout.write(`\n${steps[1]}:\n`);
process.stdout.write("  >  ");

let photos = [];

process.stdin.on('data', function(data) {
    photos.push(data.toString().trim());
    process.exit();
});

process.on('exit', function(data) {

});
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
