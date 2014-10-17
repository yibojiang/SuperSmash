#pragma strict

var hpObj:GameObject;
var HP:float;
var maxHP:float;

var character:Character;
var anim:Animator;

var part:int;

function Awake(){

	anim=GetComponent(Animator) as Animator;
	//Debug.Log("anim: "+anim);
}

function Alive():boolean{
	if (character==null){
		return false;
	}
	else{
		return true;	
	}
}


function Start () {

}

function Init(_character:Character){
	
	character=_character;
	transform.parent=character.transform;
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
		transform.parent=null;
		character=null;
		//HP=maxHP;


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