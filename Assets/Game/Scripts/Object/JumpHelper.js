#pragma strict
var bodyPart:CharacterBodyPart;

function Jump(){
	if (bodyPart.character!=null){
		if (bodyPart.character.grounded){
			bodyPart.character.jump=true;	
		}
		
	}
}