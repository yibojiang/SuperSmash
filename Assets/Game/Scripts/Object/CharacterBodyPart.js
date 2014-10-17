﻿#pragma strict

var hpObj:GameObject;
var HP:float;
var maxHP:float;

var character:Character;
var anim:Animator;

var part:int;
var speed:float=2;

private var atkState :int= Animator.StringToHash("Base Layer.Attack");
private var walkState:int=Animator.StringToHash("Base Layer.Walk");
private var idleState:int=Animator.StringToHash("Base Layer.Idle");

function RedFlash(){
	var sr:SpriteRenderer[]=this.GetComponentsInChildren.<SpriteRenderer>();
	var toggle:float=0;
	
	while (toggle<0.2){
		toggle+=Time.deltaTime;

		var i:int;
		for (i=0;i<sr.Length;i++){
			sr[i].color=Color.Lerp(Color.red,Color.white,toggle/0.2);	
		}
		
		yield WaitForEndOfFrame();

	}


}

function Awake(){

	anim=GetComponent(Animator) as Animator;
	//Debug.Log("anim: "+anim);
}

function Start(){
	atkState=Animator.StringToHash("Base Layer.Attack");
}

function Alive():boolean{
	if (character==null){
		return false;
	}
	else{
		return true;	
	}
}

function IsAttacking():boolean{
	if (anim.GetCurrentAnimatorStateInfo(0).nameHash == atkState ){
		return true;
	}
	else{
		return false;
	}
}

function Init(_character:Character){
	
	character=_character;
	transform.parent=character.transform;
	transform.localPosition=Vector3(0,0,0);
	hpObj=Instantiate(GameManager.Instance().hpPrefab);
	character.hpObj.AddHPObj(hpObj);


	if (rigidbody!=null){
		gameObject.Destroy(rigidbody);
	}
}

function Update(){
	if (hpObj!=null){
		hpObj.transform.localScale.x=HP/maxHP*100;	
	}
}

function Hurt(_damage:float){
	HP-=_damage;
	RedFlash();
	if (HP<0){
		Drop();
	}

	if (character!=null){
		character.Hurt(_damage);
	}
}


function Drop(){
	if (hpObj!=null){
		character.hpObj.RemoveHPObj(hpObj);
		Destroy(hpObj);
		//Destroy(this.gameObject);
		character.CheckDie();
		character.bodyParts.Remove(this);
		transform.parent=null;
		character=null;
		
		HP=maxHP;


		gameObject.AddComponent(Rigidbody);

	}
}

/*
function Die(){
	if (hpObj!=null){
		character.hpObj.RemoveHPObj(hpObj);
		Destroy(hpObj);
		//Destroy(this.gameObject);
		transform.parent=null;
		character=null;
		//HP=maxHP;

		gameObject.AddComponent(Rigidbody);

	}
}
*/

function Attack(){
	if (anim!=null){
		anim.SetTrigger("Attack");	
	}
	
}