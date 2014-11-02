#pragma strict
var cb:CharacterBodyPart;
var hoverForce:float;
var ps:ParticleSystem;
function Start () {

}

function FixedUpdate () {

	if (cb.character!=null){
		cb.character.gameObject.rigidbody.AddForce(-10*cb.character.gameObject.rigidbody.velocity);
		if (cb.character.GetWalkPart().gameObject==gameObject){
			var dist:float=cb.character.GroundDistance();

			var force:float=1.0/dist*hoverForce;
			cb.character.gameObject.rigidbody.AddForce(Vector3(0,force,0));		

			if (ps!=null){
				if (!ps.isPlaying){
					ps.Play();	
				}
			}
		}
		else{
			if (ps!=null){
				if (ps.isPlaying){
					ps.Stop();	
				}
			}
		}

	}
}