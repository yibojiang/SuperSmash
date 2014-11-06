#pragma strict

var target:Transform;
var shaking:boolean;
var shakeStrength:float;
var cameraTransform:Transform;
var shakeTransform:Transform;
var perspFactor:float=0.45;

var targetFOV:float=80;

var cam:Camera;

var factor:float=1;


private static var instance : CameraController;
 
public static function Instance() : CameraController
{
    if (instance == null)
        instance =GameObject.FindObjectOfType(CameraController) as CameraController;
    return instance;
}

var slowMotion:boolean=false;
function SlowMotion(_timeScale:float,_duration:float){

	if (slowMotion){
		return;
	}
	slowMotion=true;
	var toggle:float=0;
	var prevTimeScale:float=Time.timeScale;
	while(toggle<_duration){
		//Debug.Log(toggle);
		toggle+=Time.fixedDeltaTime;
		Time.timeScale=_timeScale;
		yield WaitForEndOfFrame();
	}


	Time.timeScale=prevTimeScale;
	slowMotion=false;
}


function ShakeCamera(_strength:float){
	shakeStrength=_strength;
	shaking=true;
}

function StopShakeCamera(){
	shaking=false;
	shakeTransform.localPosition=Vector3(0,0,0);
}

function ShakeCamera(_strength:float,_duration:float){

	if (shaking){
		return;
	}
	//DoShakeCamera(_strength,_duration);
	var toggle:float=0;

	ShakeCamera(_strength);

	while (toggle<_duration){
		//Debug.Log(toggle/_duration);
		toggle+=Time.deltaTime;
		yield WaitForEndOfFrame();
	}

	StopShakeCamera();
}

function BlurOff(){
	var blur:BlurEffect=GetComponent(BlurEffect) as BlurEffect;
	blur.enabled=false;
}

function BlurOn(){
	var blur:BlurEffect=GetComponent(BlurEffect) as BlurEffect;
	blur.enabled=true;	
}

function LightOn(){
	var ge:GrayscaleEffect=GetComponent(GrayscaleEffect) as GrayscaleEffect;
	ge.rampOffset=0;
}

function LightOff(){
	var ge:GrayscaleEffect=GetComponent(GrayscaleEffect) as GrayscaleEffect;
	ge.rampOffset=-0.05;
}


function LateUpdate () {
	//Debug.Log(Mathf.Tan(40.0/180*Mathf.PI));


	if (shaking){
		shakeTransform.localPosition=shakeStrength*Vector3(Random.value,Random.value,0);
	}
	//Get Center Position of all players
	var i:int;
	//Get left player
	var leftX:float=100000;
	var rightX:float=-100000;
	var downY:float=100000;
	var upY:float=-100000;

	if (target!=null){


		var gm:GameManager=GameManager.Instance();

		for (i=0;i<GameManager.Instance().characters.Count;i++){
			if (GameManager.Instance().characters[i].transform.position.x<leftX){
				leftX=GameManager.Instance().characters[i].transform.position.x;

			}

			if (GameManager.Instance().characters[i].transform.position.x>rightX){
				rightX=GameManager.Instance().characters[i].transform.position.x;
			}

			if (GameManager.Instance().characters[i].transform.position.y<downY){
				downY=GameManager.Instance().characters[i].transform.position.y;

			}

			if (GameManager.Instance().characters[i].transform.position.y>upY){
				upY=GameManager.Instance().characters[i].transform.position.y;
			}
		}

		if(gm.apple!=null){
			if (gm.apple.transform.position.x<leftX){
				leftX=gm.apple.transform.position.x;
			}

			if (gm.apple.transform.position.x>rightX){
				rightX=gm.apple.transform.position.x;
			}

			if (gm.apple.transform.position.y<downY){
				downY=gm.apple.transform.position.y;
			}

			if (gm.apple.transform.position.x>upY){
				upY=gm.apple.transform.position.y;
			}
		}
		
		if (GameManager.Instance().characters.Count>0){
			target.position.x=(leftX+rightX)/2;


			cameraTransform.position.x+=(target.position.x-cameraTransform.position.x)*Time.deltaTime*10;

		
			//var targetZ:float=(-293-(rightX-leftX)*perspFactor );
			//perspFactor

			var hDist:float=(rightX-leftX)/2+1;
			
			var vDist:float=(upY-downY)+5;

			var dist:float=Mathf.Max(hDist,vDist);

			var rad:float=cam.fieldOfView*factor*Mathf.Deg2Rad;
			//Debug.Log("hdist: "+hDist+" deg: "+ rad*Mathf.Rad2Deg);
			var targetZ:float=-300-( dist / Mathf.Tan(rad ) );
			cameraTransform.position.z+=(targetZ-cameraTransform.position.z)*Time.deltaTime*10;

			/*
			targetFOV=Mathf.Atan(dist/20.0)*Mathf.Rad2Deg*2;
			targetFOV=Mathf.Clamp(targetFOV,50,150);
			cam.fieldOfView+=(targetFOV-cam.fieldOfView)*Time.deltaTime*3;
			*/

		}
	}
}