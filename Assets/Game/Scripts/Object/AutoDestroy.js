#pragma strict

var life:float;
var lifeTime:float=0.5;

function Start () {

}

function Update () {
	if (life<lifeTime){
		life+=Time.deltaTime;
	}
	else{
		Destroy(this.gameObject);
	}
}