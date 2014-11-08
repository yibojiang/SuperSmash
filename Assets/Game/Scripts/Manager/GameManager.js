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
var emptyCharacter:Character;
var mobs:GameObject[];

private var mobToggle:float;
var mobInterval:float=2;

var countDown:float=30;
private var maxCountDown:float;
var tCountDown:TextMesh;

var gameStart:boolean;

var smokePrefab:GameObject;

var tLog:TextMesh;

//var gameStartAnim:Animator;
//var gameOverAnim:Animator;

var logString:List.<String>;

var tScoreBoard:TextMesh;

var scoreString:List.<int>;


var titleUI:GameObject;
var gameUI:GameObject;
var gameBgm:AudioSource;
var gameOverBgm:AudioClip;
var gameStartBgm:AudioClip;
var gameOverUI:GameObject;

var sunPath:SunPath;

var adamApple:GameObject;
var evaApple:GameObject;

var brosAnim:Animator;
var brosTransform:Transform;
var brosSmoke:ParticleSystem;
var goalPS:ParticleSystem;

var menuAnim:Animator;

var tScore:TextMesh;

var applePrefab:GameObject;
var apple:GameObject;

var platform:Transform;
var sunface:SunFace;

var gameStartClip:AudioClip;

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

function GeneratePlayer(_playerIndex:int,_characterIndex:int,_pos:Vector3,_random:boolean){
	var randomPart:GameObject;
	var generatePos:Vector3=_pos;
	
	
		
	var mob:Character=Instantiate(playerCharacters[_characterIndex],generatePos,Quaternion.identity).GetComponent(Character) as Character;	
	mob.ai=false;
	mob.mobIndex=_characterIndex;
	mob.controlIndex=_playerIndex;
	mob.SetColor(Color.white);
	characters.Add(mob);		

	if (_random){
		var bs:BodySwitch=mob.gameObject.AddComponent(BodySwitch).GetComponent.<BodySwitch>();
		bs.character=mob;
		bs.RandomBody();
	}
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

function PlayGameOverAnim(){
	titleUI.SetActive(true);
	menuAnim.Play("MenuEndStart");

	gameBgm.Stop();
	gameBgm.volume=0.6;
	gameBgm.clip=gameOverBgm;
	//gameBgm.Play();
	if (scoreString[0]>scoreString[1]){
		menuAnim.SetInteger("Win",0);
	}
	else if (scoreString[0]<scoreString[1]){
		menuAnim.SetInteger("Win",1);
	}
	else{
		menuAnim.SetInteger("Win",2);
	}
	yield WaitForEndOfFrame();
	
	while(1){
		if (menuAnim.GetCurrentAnimatorStateInfo(0).IsName("MenuIdle")){
		//if (Input.GetKey(KeyCode.Space) || Input.GetKey(KeyCode.Return)){
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
	if (menuAnim.gameObject.activeInHierarchy){
		CameraController.Instance().BlurOn();
	}
	CameraController.Instance().LightOff();
	brosTransform.localPosition.y=-5.3;
}

function GameStart(){
	maxCountDown=countDown;
	//max_time
	gameStart=true;
	gameOver=false;

	SpawnBall(3);



	GeneratePlayer(0,0,Vector3(-10,15,-286),false);
	GeneratePlayer(1,1,Vector3(10,15,-286),false);
	
	gameUI.SetActive(true);
	titleUI.SetActive(false);	

	adamApple.SetActive(false);
	evaApple.SetActive(false);
	
	PlayBrosAnim();

	CameraController.Instance().BlurOff();
	CameraController.Instance().LightOn();


}

function SpawnBall(_duration:float){
	yield WaitForSeconds(_duration);
	apple=Instantiate(applePrefab);
	apple.transform.parent=platform;
	apple.transform.localPosition=Vector3(0,50,-3);
	gameBgm.PlayOneShot(gameStartClip);
}

function Update(){
	tLog.text="";
	tScoreBoard.text="";

	
	if (Input.GetKeyDown(KeyCode.R)){
		GeneratePlayer(0,0,Vector3(Random.Range(-10,10),15,-286),true );
		GeneratePlayer(1,0,Vector3(Random.Range(-10,10),15,-286),true );
	}
	

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
		tScore.text="";
		tCountDown.text="";
		if (Input.GetKeyDown(KeyCode.Space) || Input.GetKeyDown(KeyCode.Return) || device.Action1.WasPressed ){
			if (menuAnim.gameObject.activeInHierarchy){
				if (!gameOver){
					gameBgm.clip=gameStartBgm;
					gameBgm.volume=1;
					gameBgm.Play();
					menuAnim.Play("MenuStart");
					gameOver=true;
				}	
			}
			


			if (!menuAnim.gameObject.activeInHierarchy){
				if (!gameOver){
					maxCountDown=countDown;
					//max_time
					gameStart=true;
					GeneratePlayer(0,0,Vector3(-10,15,-286),false);
					GeneratePlayer(1,1,Vector3(10,15,-286),false);
					//gameStartAnim.SetTrigger("GameStart");
					gameBgm.clip=gameStartBgm;
					gameBgm.volume=1;
					gameBgm.Play();

					

					gameUI.SetActive(true);
					titleUI.SetActive(false);	
					CameraController.Instance().BlurOff();
					PlayBrosAnim();
				}	
			}
			
			
		}
	}

	if (gameStart){
		tScore.text=String.Format("{0} - {1}",scoreString[0],scoreString[1]);
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

			sunface.SetTime(1-countDown/maxCountDown);
			countDown-=Time.deltaTime;
			tCountDown.text=countDown.ToString("f2");
		}
		else{
			gameOver=true;
			gameStart=false;

			//ShowGameOverUI();
			PlayGameOverAnim();
		}

		mobToggle+=Time.deltaTime;
		if (mobToggle<mobInterval){
			
		}
		else{
			mobToggle-=mobInterval;
			var generatePos:Vector3=Vector3(Random.Range(-20,20),50,-286 );
			

			var randomIndex:int=Random.Range(0,mobs.Length);
			var mob:Character=Instantiate(mobs[randomIndex],generatePos,Quaternion.identity).GetComponent(Character) as Character;	
			mob.mobIndex=Random.Range(0,mobs.Length);
			mob.SetColor(Color(150.0/255,150.0/255,150.0/255));
			mob.ai=true;
		}
		
	}
}