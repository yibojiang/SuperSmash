#pragma strict

var ps:ParticleSystem;
var fireSpeed:float=10;
function Update(){
	//Debug.Log(rigidbody.velocity.magnitude);
	if (rigidbody.velocity.magnitude>fireSpeed){
		if (!ps.isPlaying){
			ps.Play();	
		}
	}
	else{
		if (ps.isPlaying){
			ps.Stop();
		}
	}
}
/*
function OnTriggerEnter(_other:Collider){
	if (_other.CompareTag("Basket")){
		Debug.Log("goal");
		var basket:Basket=_other.gameObject.GetComponent.<Basket>();

		if (basket!=null){
			GameManager.Instance().AddScore(basket.flag,1);
			GameManager.Instance().SpawnBall();
			basket.ps.Play();


			Destroy(this.gameObject);


		}
		
	}	
}*/