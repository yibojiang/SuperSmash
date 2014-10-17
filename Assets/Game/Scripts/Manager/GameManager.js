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

