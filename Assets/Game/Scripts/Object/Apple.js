#pragma strict

function OnTriggerEnter(_other:Collider){
	if (_other.CompareTag("Basket")){
		Debug.Log("goal");
	}
	
}

function Start () {

}

function Update () {

}