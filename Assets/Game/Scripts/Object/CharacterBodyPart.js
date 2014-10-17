#pragma strict

var hpObj:GameObject;
var HP:float;
var maxHP:float;

var character:Character;
var anim:Animator;

function Awake(){

	anim=GetComponent(Animator) as Animator;
}


function Start () {

}

function Init(_character:Character){
	character=_character;
	hpObj=Instantiate(GameManager.Instance().hpPrefab);
	character.hpObj.AddHPObj(hpObj);
}

function Update(){
	if (hpObj!=null){
		hpObj.transform.localScale.x=HP/maxHP*100;	
	}
}

function Hurt(_damage:float){
	HP-=_damage;
	if (HP<0){
		Die();
	}

	if (character!=null){
		character.Hurt(_damage);
	}
}

function Die(){
	if (hpObj!=null){
		character.hpObj.RemoveHPObj(hpObj);
		Destroy(hpObj);
		Destroy(this.gameObject);
	}
	
}

function Attack(){
	anim.SetTrigger("Attack");
}