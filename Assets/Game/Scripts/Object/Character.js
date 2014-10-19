#pragma strict

import InControl;
import System.Collections.Generic;

var controlIndex:int;

var groundCheck:GameObject;
var grounded:boolean;


var bodyParts:List.<CharacterBodyPart>;

var jump:boolean;


var recoverRate:float;

var recoverToggle:float;
var recoverInterval:float=3;


var hpObj:HPContainer;


var initPart1:CharacterBodyPart;
var initPart2:CharacterBodyPart;

var flipDir:int;

var tTip:TextMesh;

var ai:boolean;

var characterName:String;

var originColor:Color=Color.white;

var mobIndex:int;

function SetColor(_color:Color){
	originColor=_color;
	var i:int;
	for (i=0;i<bodyParts.Count;i++){
		bodyParts[i].SetColor(_color);
	}	
}

function AddBodyPart(_part:int,_body:CharacterBodyPart){
	//bodyParts[_part]=_body;
	bodyParts.Add(_body);
	_body.Init(this);

	var i:int;
	for (i=0;i<bodyParts.Count;i++){
		bodyParts[i].transform.localPosition=Vector3(0,0,0);
	}

	_body.SetColor(originColor);
	//groundCheck=GetWalkPart().collider.size;

}

function Start () {
	AddBodyPart(0,initPart1);
	AddBodyPart(1,initPart2);

	if (controlIndex % 2==0){
		SetDir(1);
	}
	else{
		SetDir(-1);		
	}
}

function Hurt(_damage:float,_force:Vector3){
	recoverToggle=0;
	recoverInterval=0;
	rigidbody.AddForce(_force.normalized*3000 );

	if (_damage>20){
		recoverInterval=0.5;

	}

	if (_damage>40){
		recoverInterval=1;
		//rigidbody.AddForce(_force.normalized*1000 );
	}

	if (_damage>100){
		recoverInterval=1.5;	
		//rigidbody.AddForce(_force.normalized*2000);
	}
	
}

function Attack(){
	if(bodyParts.Count<1){
		return;
	}
	if (bodyParts[0]!=null){
		bodyParts[0].Attack();
	}
}

function Attack2(){
	if(bodyParts.Count<2){
		return;
	}
	if (bodyParts[1]!=null){
		bodyParts[1].Attack();
	}
}

function DropBodyPart(_part:int){
	var i:int;
	for (i=0;i<bodyParts.Count;i++){
		if (bodyParts[i].part==_part){
			bodyParts[i].Drop();
			
		}
	}



}

function PickupBodyPart(){
	var hitColliders = Physics.OverlapSphere(transform.position, detectRadius, 1 << LayerMask.NameToLayer("Body"));
	for (var i = 0; i < hitColliders.Length; i++) {
		var bp:CharacterBodyPart=hitColliders[i].gameObject.GetComponent(CharacterBodyPart) as CharacterBodyPart;
		if (bp!=null && !bp.Alive()){
			DropBodyPart(bp.part);
			AddBodyPart(bp.part,bp);
			return;		
		}	
	}
}

function IsHurting():boolean{
	if (recoverToggle<recoverInterval){
		return true;
	}
	else{
		return false;
	}
}



function SetDir(_dir:int){
	flipDir=_dir;
	if (flipDir>0){
		transform.eulerAngles.y=0;
	}
	else{
		transform.eulerAngles.y=180;
	}
}

var detectRadius:float=10;
var pickupToggle:float=0;
var pickupInterval:float=1;
var pickupBar:GameObject;

function DetectDropItem():boolean{
	var hitColliders = Physics.OverlapSphere(transform.position, detectRadius, 1 << LayerMask.NameToLayer("Body"));
	for (var i = 0; i < hitColliders.Length; i++) {

		var bp:CharacterBodyPart=hitColliders[i].gameObject.GetComponent(CharacterBodyPart) as CharacterBodyPart;
		
		if (bp!=null && !bp.Alive()){
			return true;	
		}	
	}
	return false;
}



function CheckDie(){
	if (bodyParts.Count==0){
		Die();
	}

	//Debug.Log("Die");
}

function Die(){
	//Debug.Log("Die");
	//Destroy(rigidbody);

	

}


function Reborn(_spawnDuration:float){
	//Debug.Log("REBORN");
	//yield WaitForSeconds(_spawnDuration);
	GameManager.Instance().GeneratePlayer(controlIndex,mobIndex,Vector3(Random.Range(444,485),15,-286 ));
}

function GetWalkPart():CharacterBodyPart{
	var i:int;
	for (i=0;i<bodyParts.Count;i++){
		if (bodyParts[i].part==1){
			return bodyParts[i];
		}
	}

	for (i=0;i<bodyParts.Count;i++){
		return bodyParts[i];
	}
	
		
}

var dirToggle:float;
var dirInterval:float;
var attackToggle:float;
var attackInterval:float;
var dir:Vector2;
var jumpToggle:float;
var jumpInterval:float=5;

function Update () {

	if (transform.position.y<0){
		GameManager.Instance().characters.Remove(this);

		if (!ai){
			Reborn(0.0);
		}
		Destroy(this.gameObject);
	}

	if (bodyParts.Count==0){
		return;
	}


	if (recoverToggle<recoverInterval){
		recoverToggle+=Time.deltaTime;
	}
	
	var device:InputDevice;
	if (controlIndex<InputManager.Devices.Count){
		device=InputManager.Devices[controlIndex];
	}

	
	var km:KeyboardManager=KeyboardManager.Instance();

	if (!ai){
		if (device!=null){
			dir=device.Direction;
		}
		else{
			dir=Vector2.zero;
			if (km.GetKeyAction("Left",controlIndex)){
				dir=Vector2(-1,0);
			}

			if (km.GetKeyAction("Right",controlIndex)){
				dir=Vector2(1,0);
			}
			//Debug.Log(dir);
		}
	}
	else{
		dirToggle+=Time.deltaTime;
		if (dirToggle<dirInterval){
			
		}
		else{
			dirToggle-=dirInterval;
			dir=Vector2(Random.Range(-2,2),0);
			dir.Normalize();
			dirInterval=Random.Range(1.0,4.0);
		}

		attackToggle+=Time.deltaTime;
		if (attackToggle<attackInterval){

		}
		else{
			attackInterval=Random.Range(2.0,3.0);
			attackToggle-=attackInterval;
			if(Random.value>0.5){
				Attack();
			}
			else{
				Attack2();	
			}
			
		}
	}


	if (!GetWalkPart().IsAttacking() && !IsHurting() ){
		
		var newPos:Vector3=transform.position;

		var walkSpeed:float=dir.x*GetWalkPart().speed*Time.deltaTime;
		newPos.x+=walkSpeed;
		GetWalkPart().anim.SetFloat("Speed",Mathf.Abs(walkSpeed) );
		rigidbody.MovePosition(newPos);
	}


	if (dir.x>0){
		SetDir(1);
	}
	else if (dir.x<0){
		SetDir(-1);
	}

	
	//if is recoving, cant attack or jump
	if (!IsHurting()){

		//X button
		if (!ai ){
			if (device!=null && device.Action3.WasPressed){

			}
			else{
				if (km.GetKeyActionDown("Attack1",controlIndex)){
					Attack();
				}
			}
			
		}
		

		//Y button
		if (!ai ){
			if (device!=null && device.Action4.WasPressed){
				Attack2();	
			}
			else{
				if (km.GetKeyActionDown("Attack2",controlIndex)){
					Attack2();
				}
			}
		}

		if (DetectDropItem()){
			//tTip.text="'B' to pickup";

			
			//B button

			if (!ai){
				tTip.text="Hold "+km.GetKeyName("Pickup",controlIndex)+" To Pickup !";
				if (device!=null  ){
					if  (device.Action2.IsPressed){
						if (pickupToggle<pickupInterval){
							pickupToggle+=Time.deltaTime;
						}
						else{
							PickupBodyPart();
							pickupToggle=0;
						}	
					}
					else{
						pickupToggle=0;
					}
					
				}
				else{
					if (km.GetKeyAction("Pickup",controlIndex)){
						if (pickupToggle<pickupInterval){
							pickupToggle+=Time.deltaTime;
						}
						else{
							PickupBodyPart();
							pickupToggle=0;
						}	
					}
					else{
						pickupToggle=0;
					}
				}	
			}
			
		}
		else{
			tTip.text=(controlIndex+1)+"P"+": "+characterName;	
		}
		
		pickupBar.transform.localScale.x=(pickupToggle/pickupInterval)*200;
	}
	

	if (ai){
		//tTip.text="Robot"+": "+characterName;
		tTip.text="";
	}

	grounded = Physics.Linecast(transform.position, groundCheck.transform.position, 1 << LayerMask.NameToLayer("Ground"));  
	//Debug.Log(grounded);
	
	

	if (ai){
		jumpToggle+=Time.deltaTime;
		if (jumpToggle<jumpInterval){
			
		}
		else{
			jumpToggle-=jumpInterval;
			jumpInterval=Random.Range(8.0,12.0);
			if ( grounded && !IsHurting()){
				jump=true;		
			}
			
		}
	}
	else{
		if ( grounded && !IsHurting()  ){
			if (device!=null && device.Action1.WasPressed ){
				jump=true;	
			}
			else{
				if (km.GetKeyActionDown("Jump",controlIndex) ){
					jump=true;			
				}
			}
			
		}	
	}

	if (jump){
		rigidbody.AddForce(Vector3(0,GetWalkPart().jumpForce,0) );
		jump=false;
	}
}
