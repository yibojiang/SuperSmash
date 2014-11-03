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
var playerCharacters:List.<Character>;
var mobs:GameObject[];

private var mobToggle:float;
var mobInterval:float=2;

var countDown:float=30;
var maxCountDown:float;
var tCountDown:TextMesh;

var gameStart:boolean;

var smokePrefab:GameObject;

var tLog:TextMesh;

//var gameStartAnim:Animator;
//var gameOverAnim:Animator;

var logString:List.<String>;

var tScoreBoard:TextMesh;

var scoreString:List.<int>;

//var tWin:TextMesh;

var titleUI:GameObject;
var gameUI:GameObject;
var gameBgm:AudioSource;

var gameOverUI:GameObject;

var sunPath:SunPath;

var adamApple:GameObject;
var evaApple:GameObject;

var brosAnim:Animator;
var brosTransform:Transform;
var brosSmoke:ParticleSystem;

var menuAnim:Animator;

var tScore:TextMesh;

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

function GeneratePlayer(_playerIndex:int,_characterIndex:int,_pos:Vector3){
	//GeneratePlayer(_playerIndex,_characterIndex );
	var generatePos:Vector3=_pos;//Vector3(Random.Range(444,485),15,-286 );
	var mob:Character=Instantiate(playerCharacters[_characterIndex],generatePos,Quaternion.identity).GetComponent(Character) as Character;	
	mob.ai=false;
	mob.mobIndex=_characterIndex;
	mob.controlIndex=_playerIndex;
	mob.SetColor(Color.white);
	characters.Add(mob);
}


function ShowGameOverUI(){
	gameOverUI.SetActive(true);
	gameOverUI.transform.localPosition.y=10;
	var toggle:float;
	var interval:float=5;
	while(toggle<interval){
		toggle+=Time.deltaTime;
		gameOverUI.transform.localPosition.y=Mathf.Lerp(10,0,toggle/interval);
		yield WaitForEndOfFrame();
	}

	gameOverUI.transform.localPosition.y=0;

	while(1){
		if (Input.GetKey(KeyCode.Space) || Input.GetKey(KeyCode.Return)){
			Application.LoadLevel("Game");
		}
		yield WaitForEndOfFrame();
	}

}

var gameOver:boolean;

function PlayBrosAnim(){
	var toggle:float=0;
	var interval:float=20;
	brosSmoke.Play();
	CameraController.Instance().ShakeCamera(0.3);
	while(toggle<interval){
		//Debug.Log(toggle);
		toggle+=Time.deltaTime;

		brosTransform.localPosition.y=Mathf.Lerp(-5.3,0,toggle/interval);


		yield WaitForEndOfFrame();
	}

	brosTransform.localPosition.y=0;

	CameraController.Instance().StopShakeCamera();
	brosSmoke.Stop();

	brosAnim.Play("spbros");

}

function Start(){
	//CameraController.Instance().BlurOn();
	CameraController.Instance().LightOff();
	brosTransform.localPosition.y=-5.3;
}

function GameStart(){
	maxCountDown=countDown;
	//max_time
	gameStart=true;
	GeneratePlayer(0,0,Vector3(460,15,-286));
	GeneratePlayer(1,1,Vector3(470,15,-286));
	//gameStartAnim.SetTrigger("GameStart");
	gameBgm.Play();
	gameUI.SetActive(true);
	titleUI.SetActive(false);	

	adamApple.SetActive(false);
	evaApple.SetActive(false);
	
	PlayBrosAnim();

	CameraController.Instance().BlurOff();
	CameraController.Instance().LightOn();


}

function Update(){
	tLog.text="";
	tScoreBoard.text="";
	var i:int;
	for (i=0;i<logString.Count;i++){
		tLog.text+=logString[i]+"\n";
	}

	var winPlayerIndex:int=0;
	
	for (i=0;i<scoreString.Count;i++){
		if (scoreString[i]>scoreString[winPlayerIndex]){
			winPlayerIndex=i;
		}
	}
	
	for (i=0;i<scoreString.Count;i++){

		if (winPlayerIndex==i){
			tScoreBoard.text+=(i+1)+"P: "+scoreString[i]+" *\n";
		}
		else{
			tScoreBoard.text+=(i+1)+"P: "+scoreString[i]+"\n";	
		}
		
	}

	var device:InputDevice=InputManager.ActiveDevice;

	if (!gameStart){

		//Time.timeScale=0;
		//tCountDown.text="Press 'A' or 'Space' to Start.";
		tCountDown.text="";
		if (Input.GetKeyDown(KeyCode.Space) || Input.GetKeyDown(KeyCode.Return) || device.Action1.WasPressed ){
			
			if (!gameOver){
				
				menuAnim.Play("MenuStart");
			}


			if (!menuAnim.gameObject.activeInHierarchy){
				if (!gameOver){
					maxCountDown=countDown;
					//max_time
					gameStart=true;
					GeneratePlayer(0,0,Vector3(460,15,-286));
					GeneratePlayer(1,1,Vector3(470,15,-286));
					//gameStartAnim.SetTrigger("GameStart");
					gameBgm.Play();
					gameUI.SetActive(true);
					titleUI.SetActive(false);	
					
					PlayBrosAnim();
				}	
			}
			
			
		}
	}

	if (gameStart){
		if (countDown>0){
			if (scoreString[0]>scoreString[1]){
				adamApple.SetActive(true);
				evaApple.SetActive(false);
			}
			else if (scoreString[0]<scoreString[1]){
				adamApple.SetActive(false);
				evaApple.SetActive(true);
			}
			else{
				adamApple.SetActive(false);
				evaApple.SetActive(false);
			}


			sunPath.UpdateTime(countDown/maxCountDown);
			countDown-=Time.deltaTime;
			tCountDown.text=countDown.ToString("f2");
		}
		else{
			gameOver=true;
			//gameOverAnim.Play("GameStart");
			
			//tWin.text=(winPlayerIndex+1)+"P WINS !";
			gameStart=false;


			//tWin.gameObject.SetActive(true);
			//tWin.gameObject.SetActive(false);

			ShowGameOverUI();
		}

		mobToggle+=Time.deltaTime;
		if (mobToggle<mobInterval){
			
		}
		else{
			mobToggle-=mobInterval;
			var generatePos:Vector3=Vector3(Random.Range(444,485),15,-286 );
			

			var randomIndex:int=Random.Range(0,mobs.Length);
			var mob:Character=Instantiate(mobs[randomIndex],generatePos,Quaternion.identity).GetComponent(Character) as Character;	
			mob.mobIndex=Random.Range(0,mobs.Length);
			mob.SetColor(Color(150.0/255,150.0/255,150.0/255));
			mob.ai=true;
		}
		
	}
}