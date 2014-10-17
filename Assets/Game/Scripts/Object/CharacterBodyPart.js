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

}

function Attack(){
	anim.SetTrigger("Attack");
}