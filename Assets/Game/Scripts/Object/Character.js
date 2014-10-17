#pragma strict

import InControl;
import System.Collections.Generic;


var speed:float;


var controlIndex:int;

var groundCheck:GameObject;

var gravity:float=9.8;
var grounded:boolean;


var bodyParts:List.<CharacterBodyPart>;

var jump:boolean;

var jumpForce:float;

var hitPoint:float;
var maxHitPoint:float;
var recoverRate:float;


function Start () {

}

function Hurt(_damage:float){
	hitPoint+=_damage;
	if (hitPoint>maxHitPoint){

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

function Attack3(){
	if (bodyParts[2]!=null){
		bodyParts[2].Attack();
	}
}

function Update () {

	if (hitPoint>0){
		hitPoint-=recoverRate*Time.deltaTime;
	}
	else{
		hitPoint=0;
	}
	
	var device:InputDevice;
	if (controlIndex<InputManager.Devices.Count){
		device=InputManager.Devices[controlIndex];

		if (device!=null){
			var dir:Vector2=device.Direction;

			
			transform.position.x+=dir.x*speed*Time.deltaTime;
			//transform.position.z+=dir.y*speed*Time.deltaTime;	
			
			//X button
			if ( device.Action3.WasPressed ){
				Attack();
			}

			//Y button
			if ( device.Action4.WasPressed ){
				Attack2();
			}

			//B button
			if ( device.Action2.WasPressed ){
				Attack3();
			}
		}


	}

	grounded = Physics.Linecast(transform.position, groundCheck.transform.position, 1 << LayerMask.NameToLayer("Ground"));  
	//Debug.Log(grounded);
	
	if (device!=null && device.Action1.WasPressed && grounded){
		jump=true;
	}	

	



	if (jump){
		rigidbody.AddForce(Vector3(0,jumpForce,0) );
		jump=false;
	}
	

}