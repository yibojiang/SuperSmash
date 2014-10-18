#pragma strict

var life:float;
var lifeTime:float=0.5;
var ps:ParticleSystem;
function Start () {
	 ps = GetComponent(ParticleSystem);
}

function Update () {
	if (life<lifeTime){
		life+=Time.deltaTime;
	}
	else{
		//Destroy(this.gameObject);
		ps.Stop();
	}

	if(ps)
	 {
	     if(!ps.IsAlive())
	     {
	         Destroy(gameObject);
	     }
	 }
}