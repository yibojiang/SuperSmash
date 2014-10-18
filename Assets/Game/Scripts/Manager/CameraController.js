#pragma strict

var target:Transform;

function Start () {

}

function LateUpdate () {

	//Get Center Position of all players

	var i:int;
	//Get left player
	var leftX:float=100000;
	var rightX:float=-100000;
	for (i=0;i<GameManager.Instance().characters.Count;i++){
		if (GameManager.Instance().characters[i].transform.position.x<leftX){
			leftX=GameManager.Instance().characters[i].transform.position.x;

		}

		if (GameManager.Instance().characters[i].transform.position.x>rightX){
			rightX=GameManager.Instance().characters[i].transform.position.x;

		}
	}
	
	target.position.x=(leftX+rightX)/2;

	transform.position.x+=(target.position.x-transform.position.x)*Time.deltaTime*3;
	var targetZ:float=(-293-(rightX-leftX)*0.45 );
	transform.position.z+=(targetZ-transform.position.z)*Time.deltaTime*3;
	//transform.position.z= targetZ;
	//transform.position.y=target.positiion.y;
}