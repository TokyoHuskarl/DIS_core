/*
* @module NsLib_GUI
*/

const DEBUG = 1;
const SINGLEPLAY = true;


// in order not to cause error when you test on Node.js
var setv = setv || function(){};
var getv = getv || function(){};
var sett = sett || function(){};
var gett = gett || function(){};
var sets = sets || function(){};
var gets = gets || function(){};


function deblog(text) {
	if (DEBUG == 1) {
		console.log(text);
	}
}


// RM var types
const RMvar = 1,
	RMswitch = 2,
	RMstring = 3,
	RMpicture = 4;

function getRM(typ,add) {
	
	if (typ == RMvar) {
		return getv(add)
	} else if (typ == RMswitch) {
		return gets(add)
	} else if (typ = RMstring) {
		return gett(add)
	}

}


// Set RM Var addresses
// DIS project
//

const RM_MousePointer = {
	x: 51, // v[51]
	y: 52, // v[52]
	click: 43, // ?
}

// RM information var addresses - if these elements become directly accessible through RM2k3 Object later, this part will be removed
const adr_RMresolutionX = 1001,
	adr_RMresolutionY = 1002;

// addresses for RM t[]..
const adr_RMstr_UIorder = 731; // -> NsLib_GUI_functions.tpc -> Str_UI_ORDER


// addresses for RM t[]..
const adr_RMbool_RUN_RENDER = 131; // -> NsLib_GUI_functions.tpc -> Str_UI_ORDER


// ------------------------------------------------
// DIS objects
// ------------------------------------------------

var DIS = DIS || {};

const trp = {}; // troop ID table

DIS = { // DIS fundamental components
	initID: function(){ // this must be called every after DIS game id is loaded on the game

		// macro (man there must be more better way to make macro but idk js very well)
		let parse_DISid = function(line) {
			const [key, value] = line.split('=');
			trp[key] = parseInt(value,10);
		};

		// starts from troop ID
		let TroopIDstr = gett(801); // get scripts/const_troops.txt
		let lines = TroopIDstr.trim().split('\n');
		lines.forEach(line => {
			parse_DISid(line)
		});

		// now you can use troopID by writing like this: trp["TRP_sushi_kensei"] 
		
	},

	reload: function(){
		this.initID(); // restore ID 
	}
},



DIS.log = {
	
	// ??
	Adrt_ShLog: 782, // same as Shell Log address 
	
	
	pushLog: function(text) { // test
		sett(gett(this.Adrt_ShLog) + "\n" + text)
	},
	
	
	
}

DIS.conf = {

	// resolution
	resolution: {
		width: getv(adr_RMresolutionX), // DIS only
		height: getv(adr_RMresolutionY), // DIS only
	},

}

// DIS functions around string system
DIS.string = {

	// return string
	getQstr: function(id) {
		const Adrt_Qstr_Head = 20000; // QuickString array starts from this number in DIS
		var string = gett(Adrt_Qstr_Head + id);
		return string;
	},

	getMapstr: function(id) { // ?
		const Adrt_mapstr_head = 40000
		var string = gett(Adrt_mapstr_head + id);
		return string;
	},

}

DIS.agent = {

	
	setName: function(agentid,name) {
		
	},

}


// ------------------------------------------------
// DIS RTS manager
// ------------------------------------------------

// The goal of DIS RTS manager system on Quickjs is just to make the game system more flexible, but not to control everything of DIS with it.
// Why? Because js is too slow to handle everything of DIS system (and stuff of RM2k3).
// All these system is just a help helper for developers.

// Particularly, restoration process shouldn't be too big to handle.
// The game itself must be able to go on even without management system on Quickjs if possible. I guess.. - TokyoHuskarl


//
if (SINGLEPLAY){
	const TEAM_GAIA = -1,
		TEAM_PLAYER = 0,
		TEAM_ENEMY = 1,
		TEAM_NEUTRAL = 2,
		TEAM_ALLY = 3;
};

// DIS system component classes - these class objs usually work as component under RTS objects.

class DISmission {
	constructor(missionid,mapid){
		this.missionid = missionid; // usually string
		this.mapid = mapid; // if 0, open custom map
	};

	essential = { // these elements must be restored when you reload the game via save/load.
		passedFrame: 0, //  if DIS game is reloaded, then reload from RM var. 
		players: [],
		difficulty: 0,
		isSightSystemOn: true,
		weatherType: 0,
	};

	reload = function(){
		
	};

	// mission.run() - this one is called in every frame.
	run = function(){ // called on RM per 1f
		this.passedFrame++; // + 1 frame  
		this.triggers.runTriggers() // check simple triggers
	};

	triggers = {
		
		runTriggers: function(){
			// but how?
			for (let TRIGGER of this.queue) {
			
			
			};
		
		},

		queue: [],
	};

	func = { // mission.func - DIS players should touch call only these functions under the mission obj.

		setPlayer: function(id,faction){ // set player in mission.
			this.players[id] = new RTSplayer(id,faction); // push to players array
			if (id == 0 && SINGLEPLAY) { // DIS LEGACY - single player only.
				this.players[id].isHuman = true; // then player0 is always considered human.
			};
		},

	};

};


// RTS map class
class RTSmap {
	constructor(mapdeffile){
		this.source = mapdeffile || "editmode";
		this.size = [50,50]; // temp
		this.isGenerated = false;
		this.hasTerrainData = false;
		this.hasPresetHeightMap = false;
		this.originalTileSet = 1; // RM tile set - if it's not defined, at least try to load 1.
	}
	

	build(){ // this function called through mission init process, after loading mapdef.js.txt.
		
		if (this.init() != NULL){ // call init process..
			
			
		} else { // if RTS.map.init() is not overridden, it's a leagcy map without any js empowerment.
			
			
		};
		
		this.isGenerated = true; // generate process finished.
	};
	
	init(){return NULL;}; // override me. written in mapdef.js.txt.

	
	generate(){return NULL;}; // overload me. written in mapdef.js.txt.
	
};


class RTSplayer {
	constructor(id,factionid){
		this.id = id;
		this.faction = factionid;
		this.isHuman = false;
	};

};


// RTStrigger - old simple trigger.
// maybe you need to build up restoring processes for mission and triggers.
// both creation and deletion of the simple triggers must be memorized in RMvar (or str) just for restoring save data. After all.
class RTStrigger {
	constructor(cond){ // if you give any condition that returns bool as a arg0, it becomes condition of the new trigger.
		
		this.condition = cond || function(){return true;}; // return bool. can be overridden later.

	}

	run = function(){
		const CONTINUE = true; // if this function returns false, then erase from triggers.
	
		if (this.condition()){ // you might need to reconsider later but temporary 
			this.effect();
			return this.isLoop; // if this trigger set to keep looping, then return true. 
		};
		
		return CONTINUE;

	};

	effect = ()=>{ /* override me later in missiondef file! */ }; 
	timer = 0; // ++ in mission trigger run function.
	isLoop = false; // whether this trigger will be called even after fulfilling condition once.

};

//


// ------------------------------------------------
// DIS RTS module
// ------------------------------------------------
let RTS = {
	isRTSmode: false,
	mission: new DISmission(),

	initMission: function(){this.mission = new DISmission();},
	openMission: function(missionid,mapid){ // "openmap" command in the old DISshell.
		this.mission = new DISmission(missionid,mapid);
		
	},

	reload: function(){ // call this function whenever player loads RMsavedata. reload all datas from RM memories.
		
	},




};




// ------------------------------------------------
// DIS Command Object
// ------------------------------------------------

// DIS Command types -> module_Game_scripts_functions.tpc
const CTYP_MAP = 1,
	CTYP_SND = 2,
	CTYP_MISSION = 3,
	CTYP_GAME = 4,
	CTYP_AGENT = 5,
	CTYP_PLAYER = 6,
	CTYP_END = 999;


// -> module_Game_scripts_general.tpc
const adr_RMbool_RUN_CMD = 132,
	adr_RMStr_CmdOrder = 795;

// DIS Command Object
// (Almost) all command functions in objects in the Cmd module will be executed on RM interpreter, not on js process.
var Cmd = {
	// DIS command
	CmdQueue: "",

	reload: function(){
		this.runFlags.initAll();
	},


	Qset: function(typ,name,ord){
		Cmd.CmdQueue += (typ + "," + name + "," + ord + ";");
	},
	
	runFlags: {
		initAll: function() {
			SpawnDetect = false;
			RMwaitDetect = false;
		},

		SpawnDetect: false, // init this flag
		RMwaitDetect: false, //
	},


	// give signal to run DIS commands 
	run: function() {
		if (this.CmdQueue != "") {
			// give raw cmd as string to RPGMaker
			sett(adr_RMStr_CmdOrder,this.CmdQueue);
			// turn on RM switch to run interpreter as cev
			sets(adr_RMbool_RUN_CMD,1);
			
			this.runFlags.initAll();
			this.CmdOrder = ""; // initialize Command Order
		}
	},
	
	//Cmd.game
	game: {
		CmdType: CTYP_GAME,

		exec: function(jsfile) { // execute js file
			Cmd.Qset(this.CmdType,"exec",`${jsfile}`);
		},

		wait: function(RMwaittime) { // RMwaittime: 10 = 1sec, 0 = 1f, -n = {n}f. 
			Cmd.Qset(this.CmdType,"wait",`${RMwaittime}`);
			Cmd.runFlags.RMwaitDetect = true;
		},

		eval: function(jsSentence) { // eval(jsSentence) on the DISCmd interpreter. might be dangerous 
			Cmd.Qset(this.CmdType,"eval",`${jsSentence}`);
		},

		gotoRMmap: function(RMmapid,tilepos) { //
			tilepos = tilepos || [0,0]
			Cmd.Qset(this.CmdType,"gotoRMmap",`${RMmapid},${tilepos[0]},${tilepos[1]}`);
		},

		// log series
		log: function(txt){
			Cmd.Qset(this.CmdType,"msg",`${txt}`);
		},

		log_error: function(txt){
			Cmd.Qset(this.CmdType,"msg",`\\C[17]ERROR:${txt}`);
		},

		log_debug: function(txt){
			Cmd.Qset(this.CmdType,"msg",`\\C[5]DEBUG:${txt}`);
		},	
		
		// turnSon:1,


	},

	//Cmd.map
	map: {
		CmdType: CTYP_MAP,

		
		agentGenPtrPos: 0, // 


		
		/* spawnerInfoUpdate: ()=> {
			if (Cmd.bl_SpawnCmdCalled == false){}
		} need to consider well */ 


		spawnAgent: function(troopid,tilepos,team,cohort,dir,stance){ // {int}, array[x,y]
			cohort = cohort || 0; // ok?
			dir = dir || 0; // ok?
			stance = stance || 0; // ok?
			
			Cmd.Qset(this.CmdType,"spawnAgent",`${troopid},${tilepos[0]},${tilepos[1]},${team},${cohort},${dir},${stance}`);
			return {address: 4545, uniqueID: 114514}; // kari
		},

		spawnStatic: function(staticID,tilepos,team,cohort){
			cohort = cohort || 0; // ok?
			Cmd.Qset(this.CmdType,"spawnStatic",`${staticID},${tilepos[0]},${tilepos[1]},${team},${cohort}`);
			return {address: 4545, uniqueID: 114514}; // kari
			
		},

		spawnPalisade: function(team,tilepos){
			Cmd.Qset(this.CmdType,"spawnPalisade",`${team},${tilepos[0]},${tilepos[1]}`);
		}, // you need to wait 1f

		spawnWall: function(team,tilepos){
			Cmd.Qset(this.CmdType,"spawnWall",`${team},${tilepos[0]},${tilepos[1]}`);
		}, // you need to wait 1f

	},

	//Cmd.snd
	snd: {
		CmdType: CTYP_SND, 
		playGlobalSE: function(file,vol,tempo,ballance) { // "cmd_play_global_sound"
			Cmd.Qset(this.CmdType,"playGSE",`${file},${vol},${tempo},${ballance}`);
		},

		playBGM: function(file,vol,tempo,ballance) { // "cmd_play_global_sound"
			Cmd.Qset(this.CmdType,"playBGM",`${file},${vol},${tempo},${ballance}`);
		},
		
	},

	// -------------
	// Cmd.mission 
	// -------------
	mission: {
		CmdType: CTYP_MISSION, 
		
		
		endMission: function(consequence) { // 1 = def, 2 = vic
			Cmd.Qset(this.CmdType,"endGame",`${consequence}`);
		},

		allowToQuit: function() {
			Cmd.Qset(this.CmdType,"setQuit","");
		},

	},
	
	// -------------
	// Cmd.agent 
	// -------------
	agent: {
		CmdType: CTYP_MISSION,
		
		setName: function(agentAdr, name) {
			Cmd.Qset(this.CmdType,"setName",`${agentAdr},${name}`);
		},

	
	},

	// -------------
	// Cmd.player 
	// -------------
	
	player: {
		CmdType: CTYP_PLAYER,

		revealMap: function(playerid){
			Cmd.Qset(this.CmdType,"revealMap",`${playerid}`);
		},

		moveCamera: function(tilepos){
			Cmd.Qset(this.CmdType,"moveCamera",`${tilepos[0]},${tilepos[1]}`);
		},

	},



};




let mouseState = {
	x: 0,
	y: 0,
	click: 0,
	Ldrag: 0,
	Rdrag: 0,
	Mdrag: 0,
}



// UI SYSTEM


// UI types set
const UIOBJ_undefined = 0,
	UIOBJ_checkbox = 1,
	UIOBJ_simplebutton = 2,
	UIOBJ_simplesprite = 3,
	UIOBJ_strpic = 4,
	UIOBJ_radiobutton = 5;

// UI render order
const PICCMD_Keep = 0,
	PICCMD_Refresh = 1,
	PICCMD_Erase = 2,
	PICCMD_Genstr = 3;


/*
* @class NsGUImgr
*
*
*/
// NsGUImgr is a global object which regulates all GUI system in your game
let NsGUImgr = {

	scene: 0,
	mouseState: mouseState,
	presentations: [],

	resetPresens: function() {
		delete this.presentations;
		this.presentations = [];
	},


	// get mouse status
	controlUpdate: function() { 
		this.mouseState.x = getv(RM_MousePointer.x);
		this.mouseState.y = getv(RM_MousePointer.y);
		this.mouseState.click = getv(RM_MousePointer.click);
		this.mouseState.Ldrag = getv(RM_MousePointer.click) == 1005 ? this.mouseState.Ldrag + 1 : 0; // if == 1, it's clicked.

	},


	

	// try
	// this one will be called in RM cev loop per 1f, and give orders to other parallel cev manager, I mean UIrendering and ScaleScript commands. 
	runPresen: function() {

		let UIorderstr = "";

		this.controlUpdate() // get mouse vars
		for (let PRESEN of this.presentations) {
			
			if(PRESEN.is_controllable) { //if the presentation is controllable
				PRESEN.proc() // then run all UI objects in the presentation
				
				// order strings..

				UIorderstr += PRESEN.UI_RenderingOrder2RMcev;
				SSCmdOrderstr += PRESEN.UI_ScaleCmdOrder2RMcev;

			}
			
		}

		// give render order string to RPGMaker to execute cmds
		deblog(UIorderstr);
		sett(adr_RMstr_UIorder,UIorderstr);

		//sets(adr_RMbool_RUN_RENDER,1); // call render manager
	},


}



// Presentation
// this should be let in init process of the game.
class Ns_Presentation {
	
	constructor(pid) {
		this.is_controllable = true; // while this property is true, keep running proc function
		this.picidstart = pid; // {int} starts from this RMpid
		this.alloc_pid = pid; // begins from picidstart
		this.UI_components = []; // blank array where you push components
		this.UI_RenderingOrder2RMcev = "";
		this.UI_ScaleCmdOrder2RMcev = "";

	}

	// run all UI objects
	proc = function() {
		let rendering_order_string = ""; // give this string to RM UI rendering manager cev.
		
		for (let part of this.UI_components) {
				rendering_order_string += part.render() + ";";
				part.UIcheck();
		};

		// store rendering order string
		this.UI_RenderingOrder2RMcev = rendering_order_string;

		
		
	}

	add = function(component) {
		this.UI_components.push(component); // push to components array
		this.alloc_pid += component.set_to_presen(this.alloc_pid); // the presentation allocates pid to the object and its children
	}

}


// Fundamental class for every UI objects.
// An UI object usually has one RMpicture, when the object is pushed to the presentation.components array, its pid is set.
class UI_object {
	// x, y
	constructor(x,y) {
		this.UI_objtype = UIOBJ_undefined;
		this.pid = 0;
		this.x = x;
		this.y = y;
		this.children = [];
		this.RGBS = [100,100,100,100]; // array
		this.transparency = 0; // 0 to 100
	}


	setpic = function(picture_file) {
		this.picture = picture_file;
		this.UI_objtype = UIOBJ_simplesprite;
	}

	settxt = function(string) {
		this.text = string;
		this.UI_objtype = UIOBJ_strpic;
	}


	render = function() {
		// override me if you want.
		// initial UIobj render method is quite simple.

		let ORDER = ""; // init

		if (this.picCmd == PICCMD_Refresh) { // renew picture 
			if (this.picture != NULL) { // call show picture cmd
				ORDER = `${this.UI_objtype},${this.pid},${this.picCmd},${this.picture},${this.x},${this.y}`;
				
			} else if (this.text != NULL) { // show string picture cmd
				ORDER = `${this.UI_objtype},${this.pid},${this.picCmd},${this.text},${this.x},${this.y}`;

			}
		}

		this.picCmd == PICCMD_Keep;
		return ORDER;
		
	}

	UIcheck = function() {
		// override me
		
	}

	L_click = function() {
		// override me
			
	}

	R_click = function() {
		// override me
			
	}

	overlap = function() {
		// override me
			
	}

	
	addChild = function(childobj) {
		this.children.push(childobj); // push to components array
	}

	set_to_presen = function(allocpid) {
		// count up how many picutre IDs this UI object needs
		let picture_amount = 1;
		this.pid = allocpid;
		
		for (let child of this.children) {
			if (child instanceof UI_object) { // if this UIobj has child obj, then allocate pic id to the child at the same time 
				picture_amount += child.set_to_presen(allocpid + picture_amount); // ACHTUNG! you should carefully check if this proc is working correctly 
			}
		}
		
		return picture_amount; // pew pew
	}

}

// simple check box that toggles RMswitch or even RMvar.
// (you may think this would do bit flag management, but sadly this code doesn't work for it yet.)
class Simple_Checkbox extends UI_object {
	constructor(x,y,targ_type,targ_address) {
		super(x,y);
		this.UI_objtype = UIOBJ_checkbox;
		this.targTyp = targ_type; // RMvar or RMswitch
		this.targAddr = targ_address; // RM v[n]
		this.flag = Boolean(getRM(targ_type,targ_address));
		this.setCheckMark(this.flag);
		
		this.picCmd = PICCMD_Refresh;
	}

	setCheckMark = function(flag) {
		this.txt = (flag == !flag) ? " x" : " " 
	}

	Lclick = function() {
		// toggle check box flag
		// use RMset
		if (this.targTyp == RMswitch) {
			sets(this.targAddr,this.flag)
		} else if (this.targTyp == RMvar) {
			setv(this.targAddr,this.flag) // is this even needed?
		}

		this.setCheckMark(this.flag);

		
		this.picCmd = PICCMD_Genstr;
		
	}

	UIcheck = function() {
		// check hit box
	}

	render = function() {
		// checkbox,pid,picCmd,text
		// // debug
		let ORDER = `${this.UI_objtype},${this.pid},${this.picCmd},${this.txt},${this.x},${this.y}`;
		this.picCmd = PICCMD_Keep; // reset picCmd
		return ORDER;
	}

	
}

class Radiobutton extends UI_object {
	constructor(x,y,targ_address) {
		super(x,y)
		this.UI_objtype = UIOBJ_radiobutton;
		this.targAddr = targ_address; // RM v[n]
		this.selected = getv(targ_address); // RM v[n]
		this.picCmd = PICCMD_Refresh;
	}

	
	addStrpic = function(relX,relY,text) { // set relative position to Parent Radiobutton object
		// make a quite simple string picture and add it as a child
		let childstr = new UI_object(relX + this.x,relY + this.y); 
		childstr.settxt(text);
		this.addChild(childstr);
	}
	
	addButton =  function(relX,relY,setnum) {
		// make a simple button that turns on  and add it as a child
		let childbut = new UI_object(relX + this.x,relY + this.y); 
		this.addChild(childbut);
	}

	Lclick = function() {

	}

	UIcheck = function() {
		// check hit box
	}

	render = function() {
		// checkbox,pid,picCmd,text
		// // debug
		let ORDER = "";
		for (let child of this.children) {
			child.picCmd = this.picCmd;
			ORDER += child.picCmd.render();
		};

		this.picCmd = PICCMD_Keep; // reset picCmd
		return ORDER;
	}

	
}


// init load
{
	Cmd.map.spawnAgent(1,[114,514],0,0,1,0);
	deblog(Cmd.CmdQueue);
	deblog("TRP_merc_mob = " + trp["TRP_merc_mob"])
}
