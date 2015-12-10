window.onload = function (){
	$f("player", "../SWF/flowplayer-3.2.18.swf", 'http://localhost/barsandtone.flv');
}

function playFlowPlayer() {
	$f().play({url:'http://localhost/20051210-w50s.flv'});
}