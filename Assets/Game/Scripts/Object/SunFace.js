#pragma strict

var sunSprite:SpriteRenderer;


var suns:SpriteRenderer[];

function SetTime(_progress:float){
	//Debug.Log(_progress);
	var frame:int=suns.Length*_progress;
	var i:int;
	for (i=0;i<suns.Length;i++){
		suns[i].gameObject.SetActive(false);	
	}
	frame=Mathf.Clamp(frame,0,suns.Length-1);
	suns[frame].gameObject.SetActive(true);	
}

var toggle:float;
/*
function Update(){
	//toggle+=Time.deltaTime*0.1;
	SetTime(toggle);
}
*/