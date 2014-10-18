#pragma strict
var spitPrefab:GameObject;
var shotTransform:Transform;

function Spit(){
	var sp:SpitBullet=Instantiate(spitPrefab,shotTransform.position,Quaternion.identity).GetComponent(SpitBullet) as SpitBullet;

	var bp:CharacterBodyPart=this.GetComponent(CharacterBodyPart) as CharacterBodyPart;
	//Debug.Log(sp);
	sp.character=bp.character;

	if (bp.character!=null){
		sp.gameObject.rigidbody.AddForce(Vector3(bp.character.flipDir*600,0,0) );
		if (bp.character.flipDir>0){
			sp.transform.eulerAngles.y=0;
		}
		else{
			sp.transform.eulerAngles.y=180;
		}	
	}
	
	
}
