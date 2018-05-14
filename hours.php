<?php
 header("Access-Control-Allow-Origin: *");
 $string = file_get_contents("./hours.json");
 $places = json_decode($string, true);
 header('Content-type: application/json');
 $name = $_GET["name"];
//  toDate("4\/6\/2018");

$nowDate = date_create(date_format(date_create(NULL,timezone_open("America/Chicago")),"Y-m-d"),timezone_open("America/Chicago"));
if (array_key_exists("now", $_GET)) {
    // echo("NOW TIME");   
    echo(json_encode(getCurrents($places)));
    return;
}

if(array_key_exists("closestname", $_GET)){
    echo("closest result");
    // return;
    $p = findPlace($places,$_GET["closestname"]);
    echo(json_encode($p));
    return;
}
if (array_key_exists("next", $_GET) && array_key_exists("name", $_GET)) {
    // echo("here");
    // return;
    $amount = $_GET["next"];
    $name = $_GET["name"];
    
    $place =findPlace($places,$name)[0];
    $current = getEraForPlace($place,$nowDate);
    if (empty($amount)){
        $amount = 4;
    }
    // echo("You want nexxxt");
    // echo($amount);
    // return;
    $result = array();
    $result['name'] =  $place['name'];
    $result['eras'] = array();
    $result['eras'][] = $current;
    // echo("so far");
    // echo(json_encode($result));
    for ($i=1; $i < $amount; $i++) { 
        // echo("i is");
        // echo($i);
        // echo("   ");
        $d = addOneDay($result['eras'][$i-1]['to']);
        // echo(date_format($d,"Y/m/d H:iP"));
        $x = getEraForPlace($place,$d); //gets the next interval containing that day.
        // echo("x is");
        // echo(json_encode($x));
        if (!is_null($x)) {
            // echo("NOT NULL ADDING TO RESULT");
            $result['eras'][] = $x;
        }
    }
    // echo("FINAL RESULTS");
    echo(json_encode($result));
    return;
}

function findPlace($places,$name){
    $array = array();
    $curbest = 1000;
    $cbp = NULL;
    foreach ($places as $place) {
       $s = levenshtein($place['name'],$name);
    //    echo("s is");
    //    echo($s);
       if($s == 0){
           //exact match. stop!
           return [$place,0];
       }
       if($s < $curbest){
           $cbp = $place;
           $curbest = $s;
       }
    }
    $array[] = $cbp;
    $array[] = $curbest;
    return $array;
}
function addOneDay($date){
    $d = clone $date;
    return date_add($d,date_interval_create_from_date_string("1 days"));
}
function fixIntervals($intervals) {
    $result = array();
    foreach ($intervals as $interval) {
        $result[] = fixInterval($interval);
    }
    return $result;
}

function getEraForPlace($place,$date){
    foreach ($place['eras'] as $era) {
        $from = toDate($era['from']);
        $to = toDate($era['to']);

        $to = toDate($era['to']);
        if(($from <= $date) && ($date <= $to)){
            $era['from'] = $from; 
            $era['to'] = $to; 
            $era['intervals']= fixIntervals($era['intervals']);
            // $obj['era'] = $era;
            return $era;
            
        }
        
    }
    

}
function getCurrents($places){
    $nowDate = date_create(date_format(date_create(NULL,timezone_open("America/Chicago")),"Y-m-d"),timezone_open("America/Chicago"));
    $results = array();

    foreach ($places as $place) {
        $obj = array();
        $obj['name'] = $place['name'];
        $obj['era'] = getEraForPlace($place,$nowDate);
        $results[] = $obj;    
    }     
    return $results;
}
function fixInterval($interval) {
  $interval['from'] = fixDate($interval['from']);
  $interval['to'] = fixDate($interval['to']);
  return $interval;
}

function fixDate($str){
    return date_format(toDate($str),"Y-m-d");
}

function toDate($str) {
    //should look like this: "4\/6\/2018"
    $arr = explode("\/", $str);
    if (count($arr) < 3) {
        $arr = explode("/", $str);
    }
    $date = date_create($arr[2] . "-" . $arr[0] . "-" . $arr[1] , timezone_open("America/Chicago"));
    // echo(json_encode($arr));
    // echo(date_format($date,"Y/m/d H:iP"));
    // echo(json_encode($date));
    return $date;
}
?>