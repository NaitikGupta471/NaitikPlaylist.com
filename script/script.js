
let playbarsonginfo = document.querySelector(".playbarsonginfo")
let but = document.querySelector(".play-pause")
let playscroll = document.querySelector(".playscroll")
let timezone = document.querySelector(".timezone")
let playcircle = document.querySelector(".circle")
let previous = document.querySelector(".previous")
let next = document.querySelector(".next")
let like = document.querySelector(".like")
let likeimg = document.querySelector(".likeimg")
let loveplaylist = document.querySelector(".love_song_playlist")
let sadplaylist = document.querySelector(".sad_song_playlist")
let motivationalplaylist = document.querySelector(".motivational_song_playlist")
let godplaylist = document.querySelector(".god_song_playlist")
let otherplaylist = document.querySelector(".other_song_playlist")
let be = document.querySelectorAll(".be")
let left = document.querySelector('.left')
let hamburger = document.querySelector(".hamburger")
let cross = document.querySelector(".cross")
let playarea = document.querySelector(".playarea")
songsfilter = []
async function getsongs() {
    let ft = await fetch("songs/")
    let response = await ft.text()
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    let songs = []
    songswithunwantedthings = []
    
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href)
            songswithunwantedthings.push(element.href.split("songs/")[1].split(".mp3")[0])
            let asdf = element.href.split("songs/")[1].split("mp3")[0].replaceAll("%20", " ").split(" ")
            let ln = asdf.length
            songsfilter.push(asdf[ln - 2].toUpperCase())
        }
    }
    
    return songs
}
// Seconds to Minute
function secondsToMMSS(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

async function main() {
    // list of songs
    let songs = await getsongs()
    let con = document.querySelector(".songslist").getElementsByTagName("ul")[0]
    for (const song of songswithunwantedthings) {
        con.innerHTML = con.innerHTML + `<li class="flex">
        <img class="invert" src="additional/song.svg" alt="">
        <div class="listsonginfo">
        <div class="listsongname">${song.replaceAll("%20", " ").split(" ").slice(0, -2).join(" ")}</div>
        </div>
        </li>`
        playbarsonginfo.textContent = `${song.replaceAll("%20", " ").split(" ").slice(0, -2).join(" ")}`
    }
    let filind = 0
    for (const filter of songsfilter) {
        if (filter == "LOVE") {
            loveplaylist.innerHTML = loveplaylist.innerHTML + `<div class="card"  data-song="${songswithunwantedthings[filind]}">
            <div class="imgarea flex center"><img src="/covers/LOVE.jpg" alt=""></div>
            <div class="songname">${songswithunwantedthings[filind].replaceAll("%20", " ").split(" ").slice(0, -2).join(" ")}</div>
            </div>`
        }
        else if (filter == "SAD") {
            sadplaylist.innerHTML = sadplaylist.innerHTML + `<div class="card" data-song="${songswithunwantedthings[filind]}">
            <div class="imgarea flex center"><img src="/covers/SAD.jpg" alt=""></div>
            <div class="songname">${songswithunwantedthings[filind].replaceAll("%20", " ").split(" ").slice(0, -2).join(" ")}</div>
            </div>`
        }
        else if (filter == "MOTIVATIONAL") {
            motivationalplaylist.innerHTML = motivationalplaylist.innerHTML + `<div class="card" data-song="${songswithunwantedthings[filind]}">
            <div class="imgarea flex center"><img src="/covers/MOTIVATIONAL.jpg" alt=""></div>
            <div class="songname">${songswithunwantedthings[filind].replaceAll("%20", " ").split(" ").slice(0, -2).join(" ")}</div>
            </div>`
        }
        else if (filter == "GOD") {
            godplaylist.innerHTML = godplaylist.innerHTML + `<div class="card" data-song="${songswithunwantedthings[filind]}">
            <div class="imgarea flex center"><img src="/covers/GOD.jpg" alt=""></div>
            <div class="songname">${songswithunwantedthings[filind].replaceAll("%20", " ").split(" ").slice(0, -2).join(" ")}</div>
            </div>`
        }
        else {
            otherplaylist.innerHTML = otherplaylist.innerHTML + `<div class="card" data-song="${songswithunwantedthings[filind]}">
            <div class="imgarea flex center"><img src="/covers/OTHER.jpg" alt=""></div>
            <div class="songname">${songswithunwantedthings[filind].replaceAll("%20", " ").split(" ").slice(0, -2).join(" ")}</div>
            </div>`
        }
        filind++
    }
    const songItems = document.querySelectorAll('.songslist li');
    let i = 0;
    let currentsong = new Audio(songs[0])
    songItems.forEach((item, index) => {
        item.addEventListener('click', function () {
            i = index
            currentsong.src = songs[index]
            playbarsonginfo.textContent = songswithunwantedthings[index].replaceAll("%20", " ").split(" ").slice(0, -2).join(" ")
            // console.log("Currently playing:", songswithunwantedthings[index].replaceAll("%20", " ").split(" ").slice(0,-2).join(" "))
            currentsong.load();
            but.innerHTML = '<img src="additional/pause.svg" alt=""></img>'
            currentsong.play();
        });
    });
    
    playbarsonginfo.textContent = songswithunwantedthings[0].replaceAll("%20", " ").split(" ").slice(0, -2).join(" ")
    but.addEventListener('click', () => {
        if (currentsong.paused) {
            currentsong.play()
            but.innerHTML = '<img src="additional/pause.svg" alt=""></img>'
        }
        else {
            currentsong.pause()
            but.innerHTML = '<img src="additional/play.svg" alt=""></img>'
        }
    })
    
    playscroll.addEventListener("click", e => {
        let slight = (e.offsetX) / (e.target.getBoundingClientRect().width) * 100
        playcircle.style.left = slight + "%"
        currentsong.currentTime = (currentsong.duration * slight) / 100
    }
    )
    
    currentsong.addEventListener("timeupdate", () => {
        timezone.textContent = `${secondsToMMSS(Math.ceil(currentsong.currentTime))}/${secondsToMMSS(Math.ceil(currentsong.duration))}`
        let toleft = (currentsong.currentTime / currentsong.duration)
        playcircle.style.left = (toleft * 100 - 0.5) + "%"
        if (toleft == 1) {
            let check = currentsong.src
            let i = songs.indexOf(check)
            currentsong.src = songs[(i + 1)]
            if (currentsong.src == "http://127.0.0.1:5501/index/undefined") {
                let con = confirm("The Playlist is over! Want to listen again")
                currentsong.src = songs[0]
                playbarsonginfo.textContent = songswithunwantedthings[0].replaceAll("%20", " ").split(" ").slice(0, -2).join(" ")
                if (con === true) {
                    currentsong.load();
                    currentsong.play();
                }
                else {
                    alert("As you wish!")
                    but.innerHTML = '<img src="additional/song.svg" alt=""></img>'
                }
            }
            else {
                currentsong.src = songs[(i + 1)]
                playbarsonginfo.textContent = songswithunwantedthings[i + 1].replaceAll("%20", " ").split(" ").slice(0, -2).join(" ")
                currentsong.load();
                currentsong.play();
            }
            i++
        }
        else { }
    })
    currentsong.addEventListener("ended", () => {
        playcircle.style.left = -0.5 + '%'
        but.innerHTML = '<img src="additional/play.svg" alt=""></img>'
    })
    previous.addEventListener("click", () => {
        if (i == 0) {
            alert("No previous song")
        }
        else {
            currentsong.src = songs[(i - 1)]
            playbarsonginfo.textContent = songswithunwantedthings[i - 1].replaceAll("%20", " ").split(" ").slice(0, -2).join(" ")
            currentsong.load();
            if (currentsong.paused) {
                but.innerHTML = '<img src="additional/pause.svg" alt=""></img>'
            }
            currentsong.play();
            i--
        }
    })
    next.addEventListener("click", () => {
        if (i == (songs.length - 1)) {
            alert("No next song")
        }
        else {
            currentsong.src = songs[(i + 1)]
            but.innerHTML = '<img src="additional/pause.svg" alt=""></img>'
            playbarsonginfo.textContent = songswithunwantedthings[i + 1].replaceAll("%20", " ").split(" ").slice(0, -2).join(" ")
            currentsong.load();
            currentsong.play();
            i++
        }
    })
    let card = document.querySelectorAll(".card")
    card.forEach(element => {
        element.addEventListener("click", () => {
            const data_song = element.dataset.song
            let ad = songswithunwantedthings.indexOf(data_song)
            currentsong.src = songs[ad]
            playbarsonginfo.textContent = songswithunwantedthings[ad].replaceAll("%20", " ").split(" ").slice(0, -2).join(" ")
            currentsong.load();
            but.innerHTML = '<img src="additional/pause.svg" alt=""></img>'
            currentsong.play();
        })
        
    });
    like.addEventListener("click", () => {
        like.innerHTML = '<img class="invert" src="additional/liked.svg" alt=""></img>'
        alert("I am happy to see that you like our playlist")
    })
    be.forEach(element => {
        element.addEventListener("click", () => {
            alert("You don't need to Sign Up / LogIn")
        })
    });
    hamburger.addEventListener("click", () => {
        left.style.left = "0"
        hamburger.style.zIndex = "-1"
        cross.style.zIndex = '1'
    })
    cross.addEventListener("click", () => {
        left.style.left = "-100vw"
        hamburger.style.zIndex = "1"
        cross.style.zIndex = "-1"
    })
    
}
let welcome = document.querySelector(".user_interaction")
if(localStorage.getItem("user_name")){
    welcome.textContent = "Welcome back, "+localStorage.getItem("user_name")+"!"
}
else{
    let user = prompt("Can I have your name please?")
    if(user===null){
        welcome.textContent = "Hello and Welcome!"
    }
    else{
        let User = user.toUpperCase()
        localStorage.setItem("user_name",User)
        welcome.append(localStorage.getItem("user_name"),"!")
    }
}
main()
