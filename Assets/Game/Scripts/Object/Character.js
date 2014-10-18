#pragma strict

import InControl;
import System.Collections.Generic;





var controlIndex:int;

var groundCheck:GameObject;
var grounded:boolean;


var bodyParts:List.<CharacterBodyPart>;

var jump:boolean;

var jumpForce:float;



var recoverRate:float;

var recoverToggle:float;
var recoverInterval:float=3;


var hpObj:HPContainer;


var initPart1:CharacterBodyPart;
var initPart2:CharacterBodyPart;

var flipDir:int;

var tTip:TextMesh;

var ai:boolean;



function AddBodyPart(_part:int,_body:CharacterBodyPart){
	//bodyParts[_part]=_body;
	bodyParts.Add(_body);
	_body.Init(this);

	var i:int;
	for (i=0;i<bodyParts.Count;i++){
		bodyParts[i].transform.localPosition=Vector3(0,0,0);
	}

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
}

function Die(){
	Destroy(rigidbody);
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

function Update () {
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

	if (device!=null){
		var dir:Vector2=device.Direction;
	}

		//Debug.Log(GetWalkPart().gameObject.name+": "+GetWalkPart().IsAttacking());
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
		if (device!=null && device.Action3.WasPressed ){
			Attack();
		}

		//Y button
		if (device!=null && device.Action4.WasPressed ){
			Attack2();
		}

		if (DetectDropItem()){
			tTip.text="'B' to pickup";
			//B button
			if (device!=null && device.Action2.IsPressed ){
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
			tTip.text=(controlIndex+1)+"P";	
		}
		
		pickupBar.transform.localScale.x=(pickupToggle/pickupInterval)*200;
	}
	

	if (ai){
		tTip.text="Robot";
	}

	grounded = Physics.Linecast(transform.position, groundCheck.transform.position, 1 << LayerMask.NameToLayer("Ground"));  
	//Debug.Log(grounded);
	
	if (device!=null && device.Action1.WasPressed && grounded && !IsHurting() && GetWalkPart().part==1 ){
		jump=true;
	}

	if (jump){
		rigidbody.AddForce(Vector3(0,jumpForce,0) );
		jump=false;
	}
	

}