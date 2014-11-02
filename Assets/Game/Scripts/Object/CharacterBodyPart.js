#pragma strict
var hpObj:GameObject;
var HP:float;
var maxHP:float;
var character:Character;
var anim:Animator;
var part:int;
var speed:float=2;
var jumpForce:float=3000;
var flyForce:float=2000;
var mass:float=1;

var groundCheck:GameObject;

private var life:float;
private var lifeTime:float=30;

var jumpCount:int;
var maxJumpCount:int=1;
var fly:boolean;

function RedFlash(){
	var sr:SpriteRenderer[]=this.GetComponentsInChildren.<SpriteRenderer>();
	var toggle:float=0;
	
	while (toggle<0.2){
		toggle+=Time.deltaTime;

		var i:int;
		for (i=0;i<sr.Length;i++){
			if (character!=null){
				sr[i].color=Color.Lerp(Color.red,character.originColor,toggle/0.2);		
			}
			else{
				sr[i].color=Color.Lerp(Color.red,Color(150.0/255,150.0/255,150.0/255),toggle/0.2);			
			}
			
		}
		
		yield WaitForEndOfFrame();
	}
}

function SetColor(_color:Color){
	var sr:SpriteRenderer[]=this.GetComponentsInChildren.<SpriteRenderer>();
	var i:int;
	for (i=0;i<sr.Length;i++){
		sr[i].color=_color;
	}
}

function Awake(){
	anim=GetComponent(Animator) as Animator;
}

function Start(){

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
	
	//if (anim.GetCurrentAnimatorStateInfo(0).nameHash == atkState ){
	if (anim.GetCurrentAnimatorStateInfo(0).IsName("attack")){
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
	hpObj.SetActive(false);
	character.hpObj.AddHPObj(hpObj);

	life=0;
	if (rigidbody!=null){
		gameObject.Destroy(rigidbody);
	}
}

function Update(){
	//Debug.Log(anim.GetCurrentAnimatorStateInfo(0).nameHash+" & "+atkState);
	if (hpObj!=null){
		hpObj.transform.localScale.x=HP/maxHP*100;	
	}

	if(character==null){
		if (life<lifeTime){
			life+=Time.deltaTime;
		}
		else{
			Destroy(this.gameObject);
		}
	}
}

function Hurt(_damage:float,_force:Vector3,_character:Character){
	HP-=_damage;
	RedFlash();
	if (HP<0){
		GameManager.Instance().LogEvent(_character.characterName+" X " +character.characterName);

		if (!_character.ai){
			GameManager.Instance().AddScore(_character.controlIndex,50);	
			CameraController.Instance().ShakeCamera(0.5,1);

			CameraController.Instance().SlowMotion(0.1,0.7);
		}
		
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
		
		character.bodyParts.Remove(this);
		character.CheckDie();
		transform.parent=null;
		character=null;
		
		HP=maxHP;
		gameObject.AddComponent(Rigidbody);
		rigidbody.mass=mass;
		SetColor(Color(150.0/255,150.0/255,150.0/255));

	}
}


function SmallJump(){
	//Debug.Log("Small Jump");

	if (character!=null && character.grounded){
		//bodyPart.character.jump=true;	
		character.rigidbody.AddForce(Vector3(0,jumpForce/2,0) );
	}
}

function Attack(){
	if (anim!=null){
		anim.SetTrigger("Attack");
	}
}

function Attacking(_attacking:boolean){
	if (anim!=null){
		anim.SetBool("Attacking",_attacking);
	}	
}