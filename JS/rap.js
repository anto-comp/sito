$(document).ready(function () {
	var canzone = [
		{
			titolo: "Biografia dei tucani",
			artista: "Tommaso S. & Gabriele T.",
			copertina: "https://raw.githubusercontent.com/anto-comp/podcast/main/foto/sassi.jpg",
			audioFile: "https://raw.githubusercontent.com/anto-comp/podcast/main/audio/sassipod.MP3",
			color: "rgb(88,101,116)"
		},
		{
			titolo: "Il sabato del villaggio",
			artista: "Martina Jacopo Uva",
			copertina: "https://raw.githubusercontent.com/anto-comp/podcast/main/foto/martina.JPG",
			audioFile: "https://raw.githubusercontent.com/anto-comp/podcast/main/audio/martinapod.mpeg",
            
			color: "rgb(155,130,110)"
		},
		{
			titolo: "Il sabato del villaggio 2",
			artista: "Noemi & Andrea",
			copertina: "https://raw.githubusercontent.com/anto-comp/podcast/main/foto/pessimo.jpg",
			audioFile: "https://raw.githubusercontent.com/anto-comp/podcast/main/audio/noepod.mp3",
			color: "rgb(218,113,197)"
		},
		{
			titolo: "La ginestra",
			artista: "Sofiane Milan Lodetti",
			copertina: "https://raw.githubusercontent.com/anto-comp/podcast/main/foto/sofi.jpg",
			audioFile: "https://raw.githubusercontent.com/anto-comp/podcast/main/audio/sofipod.mp3",
			color: "rgb(108,109,90)"
		}
        
	];
	// scrive titolo ecc cambiando
	for (let canz of canzone) {
		$("#canzone").append('<li class="canz" data-audio="' + canz.audioFile + '" data-color="'+ canz.color +'">' + 
			'<img src="' + canz.copertina + '">' +
			'<p class="canz-titolo">' + canz.titolo + '</p>' +
			'<p class="canz-artista">' + canz.artista + '</p>' + 
			'</li>');
	}
	
	$('.jcarousel').jcarousel({
			wrap: 'circular'
	});
});



// canzoine in riproduzione
$('.jcarousel').on('jcarousel:visiblein', 'li', function(event, carousel) {
	let copertina = $(this).find("img").attr("src");
	let canztitolo = $(this).find("p.canz-titolo").html();
	let canzartista = $(this).find("p.canz-artista").html();
	let audioSrc = $(this).attr("data-audio");
	let backgroundColor = $(this).attr("data-color");
	$("body").css('background', backgroundColor)
	$("#background").css('background-image', 'url('+copertina+')');
	$("audio").find("source").attr("src", ""+audioSrc+"");
	player.load();
	player.currentTime = 0;
	$("#canz-info").find("img").attr("src", copertina);
	$("#canz-info .artista-wrap p").find("span.titolo").html(canztitolo);
	$("#canz-info .artista-wrap p").find("span.artista").html(canzartista);
});

// canzone precedente
$('#previous-btn').click(function() {
	$('.jcarousel').jcarousel('scroll', '-=1');
	$('#play-btn i').removeClass('fa-pause');
	player.pause();
});

// canzone successiva
$('#next-btn').click(function() {
	if ($(".fa-random").hasClass('active')) {
		let canzone = $("#canzone li").length - 1;
		let randomcanz = Math.floor(Math.random() * canzone) + 1;
		$('.jcarousel').jcarousel('scroll', '+=' + randomcanz);
	} else {
		$('.jcarousel').jcarousel('scroll', '+=1');
	}
	$('#play-btn i').removeClass('fa-pause');
	player.pause();
});


// bottone play cambia immagine quando in pausa
$('#play-btn').click(function() {
	$(this).find('i').toggleClass('fa-pause');
});



var audioPlayer = document.querySelector('#content');
var playpauseBtn = audioPlayer.querySelector('#play-btn');
var progress = audioPlayer.querySelector('.progress');
var sliders = audioPlayer.querySelectorAll('.slider');
var player = audioPlayer.querySelector('audio');
var currentTime = audioPlayer.querySelector('#current-time');
var totalTime = audioPlayer.querySelector('#total-time');



// x bottone play
playpauseBtn.addEventListener('click', togglePlay);
// per linea sotto 
player.addEventListener('timeupdate', updateProgress);
player.addEventListener('loadedmetadata', () => {
  totalTime.textContent = formatTime(player.duration);
});



// porta avanti barra avanzamento
function updateProgress() {
  var current = player.currentTime;
  var percent = (current / player.duration) * 100;
  progress.style.width = percent + '%';
  
  currentTime.textContent = formatTime(current);
}

// tempo sopra barra 
function formatTime(time) {
  var min = Math.floor(time / 60);
  var sec = Math.floor(time % 60);
  return min + ':' + ((sec<10) ? ('0' + sec) : sec);
}
// porta avanti tempo della barra
function togglePlay() {
	player.volume = 0.5;
	
  if(player.paused) {
    player.play();
  } else {
    player.pause();
  }  
}








