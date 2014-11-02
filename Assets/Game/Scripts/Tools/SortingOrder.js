#pragma strict

var sortingOrder:int=0;
@script ExecuteInEditMode()


function Update () {
	renderer.sortingOrder = sortingOrder;
}