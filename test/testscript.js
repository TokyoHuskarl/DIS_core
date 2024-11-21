const testskill = `
	{
	"SKILL":{
		
		"pss_throwing_axe": {
			"cev": 1201
		},

		"pss_unpack_trebuchet": {
		"datatype": "enhanced",
		"name": "Unpack Trebuchet",
		"name_jp": "トレビュシェット展開",
		"Description": "Unpack Trebuchet and change its mode to Attack Mode.",
		"Description_jp": "梱包されている部品を組み立てて、攻撃モードに移行する。",

		"skillType": "self",
		"usage": "modeChange",

		"motionTime": 1,
		"extraAnimation": 0,

		"rangeMax": 32400,
		"rangeMin": 0,
		"SPcost": 0,
		"cooldown": 0,
		"skillBits": [],
		"castAIBits": [],
		"spellPowerBase": [],

		"cev": 1301
		},

		"pss_pack_trebuchet": {
		"datatype": "enhanced",
		"name": "Pack Trebuchet",
		"name_jp": "トレビュシェット梱包",
		"Description": "Pack Trebuchet and change its mode to Mobile Mode.",
		"Description_jp": "部品を梱包して、移動モードに移行する。",

		"skillType": "self",
		"usage": "modeChange",

		"motionTime": 1,
		"extraAnimation": 0,

		"rangeMax": 32400,
		"rangeMin": 0,
		"SPcost": 0,
		"cooldown": 0,
		"skillBits": [],
		"castAIBits": [],
		"spellPowerBase": [],

		"cev": 1302
		}
	}
}
`


DATA.parseDISjson(testskill)
