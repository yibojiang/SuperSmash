#pragma strict

private static var instance : KeyboardManager;
 
public static function Instance() : KeyboardManager
{
    if (instance == null)
        instance =GameObject.FindObjectOfType(KeyboardManager) as KeyboardManager;
    return instance;
}

class KeyboardMap{
	var action:String;
	var codes:KeyCode[];
}

var keyboardMap:KeyboardMap[];

function GetKeyActionDown(_action:String,_controlIndex:int){
	if (_controlIndex>=keyboardMap.Length){
		return false;
	}
	var i:int;
	for (i=0;i<keyboardMap.Length;i++){
		if (_action==keyboardMap[i].action ){
			if (Input.GetKeyDown(keyboardMap[i].codes[_controlIndex] )){
				return true;
			}
			else{
				return false;	
			}
			
		}
	}
	return false;	
}

function GetKeyAction(_action:String,_controlIndex:int){

	var i:int;
	for (i=0;i<keyboardMap.Length;i++){
		if (_action==keyboardMap[i].action ){
			if (Input.GetKey(keyboardMap[i].codes[_controlIndex] )){
				return true;
			}
			else{
				return false;	
			}
			
		}
	}
	return false;	
}

function GetKeyName(_action:String,_controlIndex):String{
	var i:int;
	for (i=0;i<keyboardMap.Length;i++){
		if (_action==keyboardMap[i].action ){
			return keyboardMap[i].codes[_controlIndex].ToString();
		}
	}
	return "Key not Config";
}

function Update(){
	//Debug.Log(GetKeyAction("Pickup",0));

	
}