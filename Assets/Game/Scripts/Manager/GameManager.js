#pragma strict
private static var instance : GameManager;
 
public static function Instance() : GameManager
{
    if (instance == null)
        instance =GameObject.FindObjectOfType(GameManager) as GameManager;
    return instance;
}


var hpPrefab:GameObject;

var characters:List.<Character>;

var mobs:GameObject[];

var mobToggle:float;
var mobInterval:float=2;


function Update(){

	mobToggle+=Time.deltaTime;
	if (mobToggle<mobInterval){
		
	}
	else{
		mobToggle-=mobInterval;
		var generatePos:Vector3=Vector3(Random.Range(444,485),12,-286 );
		Instantiate(mobs[Random.Range(0,mobs.Length)],generatePos,Quaternion.identity);	
	}
	

}