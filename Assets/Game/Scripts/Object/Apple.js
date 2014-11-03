#pragma strict
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