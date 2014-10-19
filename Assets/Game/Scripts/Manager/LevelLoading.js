#pragma strict


var black:SpriteRenderer;

var waitTime:float=3;
var fadeInterval:float=2;

function Start () {
	var toggle:float;
	toggle=0;
	while(toggle<fadeInterval){
		toggle+=Time.deltaTime;
		black.color.a=Mathf.Lerp(1,0,toggle/fadeInterval );
		yield WaitForEndOfFrame();
	}

	yield WaitForSeconds(waitTime);
	toggle=0;
	while(toggle<fadeInterval){
		toggle+=Time.deltaTime;
		black.color.a=Mathf.Lerp(0,1,toggle/fadeInterval );
		yield WaitForEndOfFrame();
	}

	Application.LoadLevel("Game");


}

