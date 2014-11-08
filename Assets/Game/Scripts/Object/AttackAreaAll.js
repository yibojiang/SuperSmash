#pragma strict
class AttackAreaAll extends AttackArea{
	function OnTriggerEnter(_other:Collider){
		//Debug.Log(_other.tag);
		if (_other.CompareTag("BodyPart")){
			
			var bp:CharacterBodyPart=_other.GetComponent(CharacterBodyPart) as CharacterBodyPart;

			if (bp.Alive() ){
				

						
				var forceDir:Vector3=bp.character.transform.position- transform.position;
				forceDir=forceDir.normalized;
				forceDir.y=0.2;
				forceDir.z=0;
				bp.Hurt(damage,forceDir.normalized*hitForce,null);

			}
			
		}
	}

	function OnTriggerStay(_other:Collider){
		if (sustainOn){
			if (_other.CompareTag("BodyPart")){
				var bp:CharacterBodyPart=_other.GetComponent(CharacterBodyPart) as CharacterBodyPart;
				if (bp.Alive() ){
		
					var hitDir:Vector3=bp.character.transform.position- transform.position;
					bp.Hurt(sustainDamage*Time.timeScale*Time.fixedDeltaTime,hitDir.normalized*hitForce,null);

				}
				
			}
		}
	}

}