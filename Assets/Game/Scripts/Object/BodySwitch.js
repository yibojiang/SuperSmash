#pragma strict

private var toggle:float;
var interval:float=0.5;

var character:Character;


function Start () {
	
}

function Resst(){
	character=GetComponent.<Character>();
}

function RandomBody(){
	if (character!=null){
		InvokeRepeating("SwitchUpBody", 0.1, 0.2);
		InvokeRepeating("SwitchDownBody", 0, 0.2);
		rigidbody.useGravity=false;
	}
}

function FinishRandomBody(){
	if (character!=null){
		CancelInvoke();
		rigidbody.useGravity=true;
		//rigidbody.enabled=true;
	}	
}

function SwitchBody(){
	var gm:GameManager=GameManager.Instance();
	var mobUpPrefab:Character=gm.mobs[Random.Range(0,gm.mobs.Length)].GetComponent.<Character>();
	var mobDownPrefab:Character=gm.mobs[Random.Range(0,gm.mobs.Length)].GetComponent.<Character>();
	var randomUpPart:CharacterBodyPart=Instantiate(mobUpPrefab.initPart1).GetComponent.<CharacterBodyPart>();
	var randomDownPart:CharacterBodyPart=Instantiate(mobDownPrefab.initPart2).GetComponent.<CharacterBodyPart>();

	character.ReplaceBodyPart(0,randomUpPart);
	character.ReplaceBodyPart(1,randomDownPart);
	//var character:Character=Instantiate(emptyCharacter,generatePos,Quaternion.identity).GetComponent(Character) as Character;	
}

function SwitchUpBody(){
	var gm:GameManager=GameManager.Instance();
	var mobUpPrefab:Character=gm.mobs[Random.Range(0,gm.mobs.Length)].GetComponent.<Character>();
	var randomUpPart:CharacterBodyPart=Instantiate(mobUpPrefab.initPart1).GetComponent.<CharacterBodyPart>();
	character.ReplaceBodyPart(0,randomUpPart);
}

function SwitchDownBody(){
	var gm:GameManager=GameManager.Instance();
	var mobDownPrefab:Character=gm.mobs[Random.Range(0,gm.mobs.Length)].GetComponent.<Character>();
	var randomDownPart:CharacterBodyPart=Instantiate(mobDownPrefab.initPart2).GetComponent.<CharacterBodyPart>();

	character.ReplaceBodyPart(1,randomDownPart);
}

function Update(){
	var km:KeyboardManager=KeyboardManager.Instance();
	if (character!=null){
		if (km.GetKeyActionDown("Attack1",character.controlIndex)  || km.GetKeyActionDown("Attack2",character.controlIndex) ){
			FinishRandomBody();
		}	
	}
	
}