#pragma strict

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

function Update(){
	var device:InputDevice=InputManager.ActiveDevice;

	if (!gameStart){
		tCountDown.text="Press 'A' or 'Space' to Start.";
		if (Input.GetKeyDown(KeyCode.Space) || device.Action1.WasPressed ){
			gameStart=true;

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