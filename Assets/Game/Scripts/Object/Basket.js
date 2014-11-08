#pragma strict
import System.Collections.Generic;
var flag:int;
var ps:ParticleSystem;
var score:int=1;
//var goalAnim:Animator;
var fireArea:AttackAreaAll;
//InvokeRepeating("Fire", 0, 5);

var firing:boolean;
private var toggle:float;
var interval:float=10;
var fireInterval:float=4;
function OnTriggerEnter(_other:Collider){
	if (_other.CompareTag("Ball")){
		Debug.Log("goal");

		GameManager.Instance().AddScore(flag,score);
		GameManager.Instance().SpawnBall(5);
		/*
		if (ps!=null){
			ps.loop=false;
			ps.Play();	
		}
		*/
		Fire();
		var targets:List.<Transform>;
		targets=new List.<Transform>();
		targets.Add(ps.transform);
		CameraController.Instance().SetTarget(targets,3);
		Destroy(_other.gameObject);
	}	
}

function Update(){
	if (fireArea!=null){
		toggle+=Time.deltaTime;
		if (toggle>interval){
			Fire();
			toggle-=interval;
		}
	}
}

function Fire(){
	//Debug.Log("firing");
	if (firing){
		return;
	}
	
	firing=true;
	if (ps!=null){
		ps.Play();	
		ps.loop=true;
	}
	if (fireArea!=null){
		fireArea.gameObject.SetActive(true);
	}
	yield WaitForSeconds(fireInterval);
	if (fireArea!=null){
		fireArea.gameObject.SetActive(false);
	}
	if (ps!=null){
		
		ps.loop=false;
		ps.Stop();
	}
	firing=false;
}
