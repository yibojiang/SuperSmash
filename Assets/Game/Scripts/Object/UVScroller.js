#pragma strict

var speed:float;
function Start () {

}

function Update () {
	renderer.material.mainTextureOffset.x-= speed*Time.deltaTime;
}