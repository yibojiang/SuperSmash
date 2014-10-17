#pragma strict

import InControl;
import System.Collections.Generic;


var speed:float;


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

function AddBodyPart(_part:int,_body:CharacterBodyPart){
	bodyParts[_part]=_body;
	_body.Init(this);
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

function Hurt(_damage:float){
	recoverToggle=0;
	recoverInterval=0;
	if (_damage>100){
		recoverInterval=0.5;
	}

	if (_damage>200){
		recoverInterval=1;
	}

	if (_damage>300){
		recoverInterval=1.5;	
	}
	
}

function Attack(){
	if (bodyParts[0]!=null){
		bodyParts[0].Attack();
	}
}

function Attack2(){
	if (bodyParts[1]!=null){
		bodyParts[1].Attack();
	}
}

function PickupBody(){
	
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
		transform.localRotation.y=0;
	}
	else{
		transform.localRotation.y=180;
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

function Update () {

	if (recoverToggle<recoverInterval){
		recoverToggle+=Time.deltaTime;
	}

	if (DetectDropItem()){
		tTip.text="'B' to pickup";
	}
	else{
		tTip.text="";	
	}

	
	var device:InputDevice;
	if (controlIndex<InputManager.Devices.Count){
		device=InputManager.Devices[controlIndex];

		if (device!=null){
			var dir:Vector2=device.Direction;

			
			//transform.position.x+=dir.x*speed*Time.deltaTime;
			var newPos:Vector3=transform.position;
			newPos.x+=dir.x*speed*Time.deltaTime;
			rigidbody.MovePosition(newPos);


			
			//if is recoving, cant attack or jump
			if (!IsHurting()){
				//X button
				if ( device.Action3.WasPressed ){
					Attack();
				}

				//Y button
				if ( device.Action4.WasPressed ){
					Attack2();
				}

				//B button
				if ( device.Action2.IsPressed ){
					if (pickupToggle<pickupInterval){
						pickupToggle+=Time.deltaTime;
					}
					else{
						PickupBody();	
					}
				}
				else{
					pickupToggle=0;
				}

				pickupBar.transform.localScale.x=(pickupToggle/pickupInterval)*200;
			}
		}
	}

	grounded = Physics.Linecast(transform.position, groundCheck.transform.position, 1 << LayerMask.NameToLayer("Ground"));  
	//Debug.Log(grounded);
	
	if (device!=null && device.Action1.WasPressed && grounded && !IsHurting() ){
		jump=true;
	}

	if (jump){
		rigidbody.AddForce(Vector3(0,jumpForce,0) );
		jump=false;
	}
	

}