﻿#pragma strict

var damage:float;
var sustainDamage:float;

var sustainOn:boolean;

var hitForce:float=2000;

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
					var forceDir:Vector3=bp.character.transform.position- myChar.transform.position;
					bp.Hurt(damage,forceDir.normalized*hitForce,myChar);
					
				}	
			}
			
			
			
		}
		
	}
}

function OnTriggerStay(_other:Collider){
	if (sustainOn){
		if (_other.CompareTag("BodyPart")){
			var bp:CharacterBodyPart=_other.GetComponent(CharacterBodyPart) as CharacterBodyPart;
			if (bp.Alive() ){
				var myChar:Character=GetComponentInParent(Character) as Character;
				if (myChar!=null){
					if (myChar!=bp.character ){
						bp.Hurt(sustainDamage*Time.timeScale*Time.fixedDeltaTime,bp.character.transform.position- myChar.transform.position,myChar);
						
					}	
				}
			}
			
		}
	}
}