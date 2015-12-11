function vidoe_name_click(name) {
	var player = document.getElementById("hBreeze_video");
	player.src = "../video/" + name + ".mp4";
	player.controls = "controls";
	player.play();
}

var accordion_resize = function() {
	$('#accordion').height($(window).height() - $('#banner').height() - 60);
}

var playerYT = null;

function btnPlayList() {
	var playList = new Array();
    playList.push("42Gtm4-Ax2U");
    playList.push("YXC7r8aGlVY");
    playerYT.cuePlaylist(playList);
    playerYT.setLoop(true);
    /*
    $.getJSON("https://gdata.youtube.com/feeds/api/videos/" + youtube + "?v=2&alt=json",
      function(data) {
        var obj = $("#player");
        var asp = data.entry.media$group.yt$aspectRatio.$t;
        console.log("Aspect Ratio is", asp); //Debugging line. "undefined" if video is 4:3.
        if(asp == "widescreen") {
            obj.height((Math.floor(obj.width() * 9 / 16)));
        }
        else {
            obj.height((Math.floor(obj.width() * 3 / 4)));
        }
    });
     */
}

//player.getPlaylistIndex():Number

var video_titles; //이벤트에서 이 변수에 접근해야돼서 할 수 없이 전역...

function loadYouTube(title, description, youtube) {
	video_titles = String(description).split(",");
    $("#title").text(title);
    $("#description").text(video_titles[0]);
    playerYT.loadPlaylist(youtube); 
    playerYT.setLoop(true);
}

function createPlayerDiv() {
	var iframe_rwd = document.querySelector(".iframe-rwd");
	var old_div_player = document.querySelector("#player");
	if(old_div_player) return;
	var new_div_player = document.createElement('div');
	new_div_player.setAttribute('id', 'player');
	new_div_player.setAttribute('class', 'video');
	iframe_rwd.appendChild(new_div_player);
}

function removePlayerDiv() {
	var iframe_rwd = document.querySelector(".iframe-rwd");
	var old_div_player = document.querySelector("#player");
	if(old_div_player)
		iframe_rwd.removeChild(old_div_player);
}

function loadFlowPlayer() {
	removePlayerDiv();
	createPlayerDiv();
	$f("player", "../SWF/flowplayer-3.2.18.swf", 'http://localhost/barsandtone.flv');
}

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player) 
//    after the API code downloads.
function loadYouTubePlayer() {
	removePlayerDiv();
	createPlayerDiv();
  playerYT = new YT.Player('player', {
      height: 720,
      width: 1280,
//      videoId: 'ZuX0rQ7twnE',
      playerVars: {
      	'controls': 2,
      	'autohide': 1,
      	'showinfo': 0},
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
  });
  
}

//4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    /* $.each($('iframe'),function(i, iframe) {
      d=$(iframe).get(0).contentDocument
      $(".ytp-large-play-button",d).click(function() {
        playerYT.playVideo();
      })
    }); */
  }
  else {
 //   event.target.playVideo();
 //   videoPlaying = true;
  }
}

// 5. The API calls this function when the player's state changes.
var done = false;
function onPlayerStateChange(event) {
    $("#description").text(video_titles[playerYT.getPlaylistIndex()]);
  if (event.data == YT.PlayerState.PLAYING && !done) {
    //setTimeout(stopVideo, 6000);
    done = true;
  }
}