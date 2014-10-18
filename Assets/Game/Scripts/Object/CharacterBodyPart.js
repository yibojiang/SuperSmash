#pragma strict

var hpObj:GameObject;
var HP:float;
var maxHP:float;

var character:Character;
var anim:Animator;

var part:int;
var speed:float=2;

var jumpForce:float=3000;

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

function Hurt(_damage:float,_force:Vector3,_character:Character){
	HP-=_damage;
	RedFlash();
	if (HP<0){
		GameManager.Instance().LogEvent(_character.characterName+" X " +character.characterName);
		GameManager.Instance().AddScore(_character.controlIndex,50);
		FlyAway(_force);
	}

	if (character!=null){
		character.Hurt(_damage,_force );
	}
}

function FlyAway(_force:Vector3){

	Drop();

	var smoke:GameObject=Instantiate(GameManager.Instance().smokePrefab);
	smoke.transform.parent=transform;
	smoke.transform.localPosition=Vector3(0,0,0);
	rigidbody.AddForce(1000*(_force.normalized+Vector3(0,1,0) ) );
	rigidbody.constraints = RigidbodyConstraints.FreezeRotationX | RigidbodyConstraints.FreezeRotationY |RigidbodyConstraints.FreezeRotationZ | RigidbodyConstraints.FreezePositionZ;
}

function Drop(){
	if (hpObj!=null){
		character.hpObj.RemoveHPObj(hpObj);
		Destroy(hpObj);
		character.CheckDie();
		character.bodyParts.Remove(this);
		transform.parent=null;
		character=null;
		
		HP=maxHP;


		gameObject.AddComponent(Rigidbody);

	}
}


function Attack(){
	if (anim!=null){
		anim.SetTrigger("Attack");	
	}
	
}