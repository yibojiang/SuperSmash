#pragma strict

var damage:float;

function OnTriggerEnter(_other:Collider){

	//Debug.Log(_other.tag);

	if (_other.CompareTag("BodyPart")){
		
		var bp:CharacterBodyPart=_other.GetComponent(CharacterBodyPart) as CharacterBodyPart;

		if (bp.Alive() ){
			
			var myChar:Character=GetComponentInParent(Character) as Character;

			if (myChar!=null){
				//Debug.Log(myChar.name+" : "+ bp.character.name);
				
				if (myChar!=bp.character ){
					
					//GameManager.Instance().LogEvent(myChar.name+" X "+ bp.character.name+" "+damage+" Damage" );
					bp.Hurt(damage,bp.character.transform.position- myChar.transform.position,myChar);
					
				}	
			}
			
			
			
		}
		
	}
}