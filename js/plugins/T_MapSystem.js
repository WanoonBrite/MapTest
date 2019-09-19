//=============================================================================
// MapSystem.js
//=============================================================================
/*:
 * @plugindesc Small map by imgs.
 * @author Acetone Chen
 *
 * @help NULL.
 */
//=============================================================================

class MapInfo {
    constructor(ID, TransformAndTrigger, mapImg, PlayerCursor, C_regions, P_placeXY) {
        this.ID = ID;
        this.TransformAndTrigger = TransformAndTrigger.slice(0);    // map’s transform tree
        /*	[original place , next place , trigger];
         *	trigger: 0 = original, 1 = up, 2 = left, 3 = right, 4 = down
         *	*/
        this.mapImg = mapImg;
        this.PlayerCursor = PlayerCursor;
        this.C_regions = C_regions.slice(0);
        this.P_placeXY = P_placeXY.slice(0);
        //this.P_place0 = P_place0;== P_placeXY[0] || P_placeXY[i]
    }
}

//0=BigMap; 1=market, 2=farm, 3=church, 4=lordCastle

var mapList = [];
    mapList[0] = new MapInfo(0,
        [143, 241, 242, 344, 412, 423, 424, 431], "Plugin_map/BigMap", "Plugin_map/PlayerCursor0", 
        ["Plugin_map/C_B1", "Plugin_map/C_B2", "Plugin_map/C_B3", "Plugin_map/C_B4"], 
        [[250, 150], [625, 150], [450, -50], [450, 150]]);
    mapList[1] = new MapInfo(1, 
        [	121,	214, 233,	322, 341, 353,	432, 454, 463,
			532, 541, 563, 574,	641, 652,	751], "Plugin_map/Map1", "Plugin_map/PlayerCursor1", 
        [   "Plugin_map/C_11", "Plugin_map/C_12", "Plugin_map/C_13", 
            "Plugin_map/C_14", "Plugin_map/C_15", "Plugin_map/C_16", 
            "Plugin_map/C_17"], 
        [   [136, 274], [183, 150], [350, 150],
            [477, 47], [477, 150], [602, 150],
            [477, 274]] );	//temp
    mapList[2] = new MapInfo(2, 
        [122, 131,	213, 241, 	314, 342, 361, 	424, 433, 452, 461,	543, 561,	633, 644, 652], "Plugin_map/Map2", "Plugin_map/PlayerCursor2", 
        ["Plugin_map/C_21", "Plugin_map/C_22", "Plugin_map/C_23", "Plugin_map/C_24", "Plugin_map/C_25", "Plugin_map/C_26"], 
        [[548, 384], [412, 379], [529, 171], [410, 171], [237, 169], [440, 10]] );
    mapList[3] = new MapInfo(3, 
        [123, 134, 212, 244, 311, 343, 421, 432], "Plugin_map/Map3", "Plugin_map/PlayerCursor3", 
        ["Plugin_map/C_31", "Plugin_map/C_32", "Plugin_map/C_33", "Plugin_map/C_34"], 
        [[250, 25], [450, 25], [250, 225], [450, 225]] );
    mapList[4] = new MapInfo(4,
        [110], "Plugin_map/Map4", "Plugin_map/PlayerCursor4", 
        ["Plugin_map/C_41"],
        [[308, 50]]);

//inherited by scenes
var BMPlayerPlace_ID;		//player place in BM, == SMID
var SMPlayerPlace_ID;

//=====initial here=====
var CursorPlace0;
var CursorPlace1; 

//var mapShow = function (order) {
function mapShow (order) {
    switch (order) {

        //Big Map-------------------
        case 0:
            //Show map: (img, player, cursor)
            $gameScreen.startTint([255,255,255,0], 60);
			
            $gameScreen.showPicture(1, mapList[0].mapImg, 0, 0, 0, 100, 100, 255, 0);
			// Player Animation
			$gameSwitches.setValue(5, true);	//let bool_5 = Bool_PlayerCursorAnimtion			
			/*
            $gameScreen.showPicture(3, mapList[0].PlayerCursor, 0,
                mapList[0].P_placeXY[BMPlayerPlace_ID-1][0],
                mapList[0].P_placeXY[BMPlayerPlace_ID-1][1], 100, 100, 255, 0);
			*/
            $gameScreen.showPicture(2, mapList[0].C_regions[CursorPlace0-1], 0, 0, 0, 100, 100, 255, 0);

			$gameScreen.startTint([0,0,0,0], 60);
            break;
        case 1:
            //Move Cursor on map

            $gameScreen.erasePicture(2);
            $gameScreen.showPicture(2, mapList[0].C_regions[CursorPlace0-1], 0, 0, 0, 100, 100, 255, 0);
            //CursorPlace0 changed before funct call
            break;
        case 2:
            //Close map
            
            $gameScreen.erasePicture(1);
            $gameScreen.erasePicture(2);
            $gameScreen.erasePicture(3);
			// PlayerCursor Animation		
			$gameSwitches.setValue(5, false);	//let bool_5 = Bool_PlayerCursorAnimtion			
			
            break;

        //Small Map-------------------
        case 10:
            //ShowMap (img, player, cursor)
            //CursorPlace0 = MapIDNeedShow
            
            $gameScreen.showPicture(4, mapList[CursorPlace0].mapImg, 0, 0, 0, 100, 100, 255, 0);
            if (CursorPlace0 == BMPlayerPlace_ID) {
                CursorPlace1 = SMPlayerPlace_ID;
				// PlayerCursor Animation		
				$gameSwitches.setValue(6, true);	//let bool_6 = Bool_PlayerCursor2_Animtion			
				/*
                $gameScreen.showPicture(6, mapList[CursorPlace0].PlayerCursor, 0, 
                    mapList[CursorPlace0].P_placeXY[SMPlayerPlace_ID-1][0],
                    mapList[CursorPlace0].P_placeXY[SMPlayerPlace_ID-1][1], 100, 100, 255, 0);
				*/
                $gameScreen.showPicture(5, mapList[CursorPlace0].C_regions[CursorPlace1-1], 0, 0, 0, 100, 100, 255, 0);
            }
            else {
                CursorPlace1 = 1;               
                $gameScreen.showPicture(5, mapList[CursorPlace0].C_regions[CursorPlace1-1], 0, 0, 0, 100, 100, 255, 0);
            }
			
            break;
        case 11:	//Move Cursor
            $gameScreen.erasePicture(5);
            $gameScreen.showPicture(5, mapList[CursorPlace0].C_regions[CursorPlace1-1], 0, 0, 0, 100, 100, 255, 0);
            break;
        case 12:	//Close map
            
            $gameScreen.erasePicture(4);
            $gameScreen.erasePicture(5);
            $gameScreen.erasePicture(6);
			$gameSwitches.setValue(6, false);	//let bool_6 = Bool_PlayerCursor2_Animtion			
			
            break;
        default: break;
    }
}

/*
Commonevent_PlayerCursorAnimation1(){	//觸發條件 = 並行，開關 = 開關5
	$gameScreen.showPicture(3, mapList[0].PlayerCursor, 0,
		mapList[0].P_placeXY[BMPlayerPlace_ID-1][0],
		mapList[0].P_placeXY[BMPlayerPlace_ID-1][1], 100, 100, 255, 0);
	$gameInterpreter.wait(60);
	$gameScreen.erasePicture(3);
	$gameInterpreter.wait(60);
}

Commonevent_PlayerCursorAnimation2(){	//觸發條件 = 並行，開關 = 開關6
	$gameScreen.showPicture(6, mapList[CursorPlace0].PlayerCursor, 0, 
		mapList[CursorPlace0].P_placeXY[SMPlayerPlace_ID-1][0],
		mapList[CursorPlace0].P_placeXY[SMPlayerPlace_ID-1][1], 100, 100, 255, 0);
	$gameInterpreter.wait(60);
	$gameScreen.erasePicture(6);
	$gameInterpreter.wait(60);
}

*/