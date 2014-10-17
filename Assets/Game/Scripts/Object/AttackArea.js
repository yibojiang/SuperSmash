#pragma strict

var damage:float;

function OnTriggerEnter(_other:Collider){

	//Debug.Log(_other.tag);

	if (_other.CompareTag("BodyPart")){
		Debug.Log(_other.name);		
		var bp:CharacterBodyPart=_other.GetComponent(CharacterBodyPart) as CharacterBodyPart;
		bp.Hurt(damage);
	}
}