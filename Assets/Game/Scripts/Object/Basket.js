#pragma strict

var flag:int;
var ps:ParticleSystem;
var score:int=1;
//var goalAnim:Animator;

function OnTriggerEnter(_other:Collider){
	if (_other.CompareTag("Ball")){
		Debug.Log("goal");

		GameManager.Instance().AddScore(flag,score);
		GameManager.Instance().SpawnBall(5);
		if (ps!=null){
			ps.Play();	
		}
		
		Destroy(_other.gameObject);
	}	
}
