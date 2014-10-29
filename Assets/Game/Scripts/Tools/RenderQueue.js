#pragma strict

var renderQueue:float=4000;
function Start () {

}

function Update () {
	renderer.material.renderQueue=renderQueue;
}