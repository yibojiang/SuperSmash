#pragma strict

import System.Collections.Generic;
import InControl;
private static var instance : GameManager;
 
public static function Instance() : GameManager
{
    if (instance == null)
        instance =GameObject.FindObjectOfType(GameManager) as GameManager;
    return instance;
}


var hpPrefab:GameObject;

var characters:List.<Character>;

var mobs:GameObject[];

var mobToggle:float;
var mobInterval:float=2;

var countDown:float=30;
var tCountDown:TextMesh;

var gameStart:boolean;

var smokePrefab:GameObject;

var tLog:TextMesh;

var gameStartAnim:Animator;

var logString:List.<String>;

var tScoreBoard:TextMesh;

var scoreString:List.<int>;

InvokeRepeating("RefreshEvent", 0, 3);
function RefreshEvent(){
	if (logString.Count>0){
		logString.Remove(logString[0]);
	}
}

function AddScore(_playerIndex:int,_score:int){
	if (_playerIndex<scoreString.Count){
		scoreString[_playerIndex]+=_score;	
	}
	
}

function LogEvent(_eventStr:String){
	logString.Add(_eventStr);

}

function Update(){
	tLog.text="";
	tScoreBoard.text="";
	var i:int;
	for (i=0;i<logString.Count;i++){
		tLog.text+=logString[i]+"\n";
	}

	for (i=0;i<scoreString.Count;i++){
		tScoreBoard.text+=(i+1)+"P: "+scoreString[i]+"\n";
	}

	var device:InputDevice=InputManager.ActiveDevice;

	if (!gameStart){
		tCountDown.text="Press 'A' or 'Space' to Start.";
		if (Input.GetKeyDown(KeyCode.Space) || device.Action1.WasPressed ){
			gameStart=true;
			gameStartAnim.Play("GameStart");

		}
	}
	if (gameStart){
		if (countDown>0){
			countDown-=Time.deltaTime;
			tCountDown.text=countDown.ToString("f2");
		}
		else{
			//GameOver();
		}

		mobToggle+=Time.deltaTime;
		if (mobToggle<mobInterval){
			
		}
		else{
			mobToggle-=mobInterval;
			var generatePos:Vector3=Vector3(Random.Range(444,485),15,-286 );
			Instantiate(mobs[Random.Range(0,mobs.Length)],generatePos,Quaternion.identity);	
		}
		
	}
}