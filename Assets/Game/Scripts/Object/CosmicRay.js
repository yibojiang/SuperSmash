#pragma strict

var line:LineRenderer;

var speed:float=10;
var endPos:float=0;

var anim:Animator;

var sustainDamage:float=10;
var hitForce:float;

var dirTransform:Transform;

var spark:ParticleSystem;

var scrolSpeed:float=15;

var color:Color=Color.white;
function Update () {
	if (anim.GetBool("Attacking") && anim.GetCurrentAnimatorStateInfo(0).IsName("attacking") ){
		var dir:Vector3=dirTransform.position-line.transform.position;
		//var fwd = line.truansform.TransformDirection (-Vector3.forward);
		var hit : RaycastHit;
		var bp:CharacterBodyPart;
		if (Physics.Raycast (line.transform.position, dir, hit)) {
			if (hit.collider.CompareTag("BodyPart")){
				//Debug.Log(hit.collider.name);


				bp=hit.collider.GetComponent(CharacterBodyPart) as CharacterBodyPart;
				if (bp.Alive() ){
					

					if (Mathf.Abs(endPos)>=hit.distance){
				
					
						var myChar:Character=GetComponentInParent(Character) as Character;

						if (myChar!=null){
							if (myChar!=bp.character ){
								var forceDir:Vector3=bp.character.transform.position- myChar.transform.position;
								bp.Hurt(sustainDamage,forceDir.normalized*hitForce,myChar);
								spark.transform.position=hit.point;
								spark.Play();
							}
							else{
								spark.Stop();
							}
						}
					
					}
					
				}
			}
		}

		Debug.DrawLine (line.transform.position, hit.point, Color.red);

		line.gameObject.SetActive(true);
		color.a=Random.value*0.7+0.3;
		//line.SetColors(color,color);
		
		endPos+=speed*Time.deltaTime;
		if (bp!=null && bp.Alive() ){
			if (Mathf.Abs(endPos)<hit.distance){
				
			}
			else{

				endPos=hit.distance;
			}
		}
		else{
			spark.Stop();
		}


		line.SetPosition(1, Vector3(endPos,0,0));
		line.renderer.material.mainTextureOffset.x-=scrolSpeed*Time.deltaTime;
		line.renderer.material.mainTextureScale = Vector2 (endPos,1);
	}
	else{
		line.gameObject.SetActive(false);
		line.SetPosition(1, Vector3(0,0,0));
		endPos=0;
	}
}