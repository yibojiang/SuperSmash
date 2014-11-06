#pragma strict

var flag:int;
var ps:ParticleSystem;

function OnTriggerEnter(_other:Collider){
	if (_other.CompareTag("Ball")){
		Debug.Log("goal");

		GameManager.Instance().AddScore(flag,1);
		GameManager.Instance().SpawnBall(5);
		if (ps!=null){
			ps.Play();	
		}
		
		Destroy(_other.gameObject);
	}	
}
