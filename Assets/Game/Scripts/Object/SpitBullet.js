#pragma strict

var life:float;
var lifeTime:float=2;
var character:Character;
var damage:float=20;
function Start () {

}

function Update () {
	life+=Time.deltaTime;
	if (life<lifeTime){

	}
	else{
		Destroy(this.gameObject);
	}
}


function OnTriggerEnter(_other:Collider){
	if(_other.CompareTag("BodyPart") ){
		var bp:CharacterBodyPart=_other.GetComponent(CharacterBodyPart) as CharacterBodyPart;

		if (bp.Alive() ){
			if (character!=bp.character ){
				if (bp.character!=null && character!=null){
					bp.Hurt(damage,bp.character.transform.position- character.transform.position,character);
					Destroy(this.gameObject);	
				}
				
				
			}	
		}
	}
}