// vanilla javascript ajax
// function getDataPerson(url,success,error) {
//     let xhr = new XMLHttpRequest();
//     // ketika state sudah siap, maka jalankan function di dalamnya
//     xhr.onreadystatechange = function() {
//         // melakukan request secara asynchronous
//         // jika readystate-nya = 4 ( 4 = sudah ready )
//         if( xhr.readyState === 4 ) {
//             // jika statusnya 200 ( 200 = sudah bisa mengakses suatu halaman (person.json / url) )
//             if( xhr.status === 200 ) {
//                 // kirim success response
//                 // jika sudah sukses maka:
//                 success(xhr.response)
//             } else if( xhr.status === 404 ) { // jika statusnya 404 (404 = page not found / salah penulisan alamat)
//                 error();
//             }
//         }
//     }
//     // jalankan ajax
//     // parameters: method, url
//     xhr.open('get', url );
//     // send
//     xhr.send();
// };
// console.log('mulai');
// // pemanggilan. parameters: url data, callback success, callback errorrs
// getDataPerson('data/person.json', results => {
//     // callback success
//     // parsing = menampilkan data dalam bentuk object, bukan text
//     let run = JSON.parse(results)
//     run.forEach(m => console.log(m.nama));
// }, () => {
//     // callback error
// });
// console.log('selesai');

// vanilla javascript ajax END


// vanilla javascript ajax Latihan
const userInput = document.querySelector('#input-user');
const place = document.querySelector('#show-here');
const modal = document.querySelector('.modal');
const mainContainer = document.querySelector('#container');

// function for placeholder interval
let placeHolder = userInput.getAttribute('value');
let placeHolderInterval = () => {
    setInterval( () => {
        let random = Math.random(),
        randomPlaceHolder = Math.floor(random *= 10);
        if( randomPlaceHolder <= 3 ) {
            placeHolder = 'Avengers'
        } else if ( randomPlaceHolder > 4  ) {
            placeHolder = 'Harry Potter'
        } else if ( randomPlaceHolder > 6  ) {
            placeHolder = 'Naruto'
        }
        console.log(placeHolder);
        userInput.setAttribute('value', placeHolder);
        userInput.style.transition = '400ms';
    }, 2500 );
}
placeHolderInterval()

// template cards
function template(el) {
    return `
        <div class="card">
            <img src="${el.Poster}" alt="">
            <h2 class="title-card">${el.Title}</h2>
            <h4 class="type">${el.Type}</h4>
            <h4 class="year">${el.Year}</h4>
            <button class="see-details" data-detail="${el.imdbID}">See Details</button>
        </div>
    `
};
// template for see details
function templateDetails(result) {
    return `
        
            <div class="close-modal"><span>X</span></div>
            <div class="container-details">
                <img src="${result.Poster}" alt="">
                <div class="details-info">
                    <h1>${result.Title}</h1>
                    <h3>Genre: ${result.Genre}</h3>
                    <h3>Actors: ${result.Actors}</h3>
                    <h3>Language: ${result.Language}</h3>
                    <h3>Writer: ${result.Writer}</h3>
                    <h3>Country: ${result.Country}</h3>
                    <h3>Total seasons: ${result.totalSeasons}</h3>
                    <h3>IMDB Rating: ${result.Ratings.Value}</h3>
                    <h3>IMDB Awards: ${result.Awards}</h3>
                    <h3>Plot:<p>${result.Plot}</p></h3>
                </div>
            </div>
        
    `;
};
function getData(url) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        let result = JSON.parse(req.responseText);
        let list = result.Search
        let output = list.map(el => template(el)).join('');
        if (req.readyState === 4) {
            if(req.status === 200) {
                console.log(list);
                place.innerHTML = output
                // script for details modal
                let seeDetails = document.querySelectorAll('.see-details');
                seeDetails.forEach((el,i) => {
                    el.addEventListener('click', e => {
                        e.preventDefault();
                        const dataId = e.target.getAttribute('data-detail');
                        getDataDetails(`https://omdbapi.com/?apikey=38654bd5&i=${dataId}`,true);
                        
                    });
                });
            } else {
                console.log(req.responseText);
            }
        }
    };
    req.open('get', url,true);
    req.send();

}
function getDataDetails(url) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        let result = JSON.parse(req.responseText);
        let output =templateDetails(result)
        if (req.readyState === 4) {
            if(req.status === 200) {
                
                console.log(result);
                modal.innerHTML = output
                modal.style.top = '15%';
                modal.style.opacity = '1';
                modal.style.transition = '800ms';
                const closeModal = document.querySelector('.close-modal');
                closeModal.addEventListener('click', () => {
                    modal.style.opacity = '0';
                    modal.style.top = '100%';
                    modal.style.transition = '1s';
                });
                
            } else {
                console.log('error');
            }
        }
    };
    req.open('get', url,true);
    req.send();
}

let btn = document.querySelector('#coba').addEventListener('click', e => {
    getData(`https://omdbapi.com/?apikey=38654bd5&s=${userInput.value}`)
    
    e.preventDefault();
    // alert('brhasil');
    console.log('mulai');
    
    userInput.value = '';
    console.log('selesai');
    
});



