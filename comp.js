const fs = require("fs");
var $includeDir = (function()
{
	var retd = [];
	retd.push("./");
	for(var i1 = 2; i1 < process.argv.length; i1++)
	{
		if(process.argv[i1] == "-I")
		{
			i1++;
			retd.push(process.argv[i1]);
			i1++;
		}
		
		
	}
	return retd;
	
})();
var $out = function(txt)
{
	process.stdout.write(txt + "");
}
function lib(c)
{
	var _MapFunc = {};
	function isAlpha(cc)
	{
		return cc >='a' && c <='z' || cc >='A' && cc <='Z';
	
	}
	function isNum(cc)
	{
		return cc >='0' && c <='9';
	}
	function isLab(cc)
	{
		return isAlpha(cc) || isNum(cc);
	}
	
	function isBracket(cc)
	{
		return cc == "(" || cc == ")" || cc == "[" || cc == "]" || cc == "{" || cc == "}";
	}
	function isLBracket(cc)
	{
		return cc == "(" ||  cc == "[" ||  cc == "{";
	}
	function isRBracket(cc)const fs = require("fs");
var $includeDir = (function()
{
	var retd = [];
	retd.push("./");
	for(var i1 = 2; i1 < process.argv.length; i1++)
	{
		if(process.argv[i1] == "-I")
		{
			i1++;
			retd.push(process.argv[i1]);
			i1++;
		}
		
		
	}
	return retd;
	
})();
var $out = function(txt)
{
	process.stdout.write(txt + "");
}
function lib(c)
{
	var _MapFunc = {};
	function isAlpha(cc)
	{
		return cc >='a' && c <='z' || cc >='A' && cc <='Z';
	
	}
	function isNum(cc)
	{
		return cc >='0' && c <='9';
	}
	function isLab(cc)
	{
		return isAlpha(cc) || isNum(cc);
	}
	
	function isBracket(cc)
	{
		return cc == "(" || cc == ")" || cc == "[" || cc == "]" || cc == "{" || cc == "}";
	}
	function isLBracket(cc)
	{
		return cc == "(" ||  cc == "[" ||  cc == "{";
	}
	function isRBracket(cc)
	{
		return cc == ")" ||  cc == "]" ||  cc == "}";
	}
	function isString(cc)
	{
		return cc == "\"" | cc == "'" | cc == "`";
	}
	var i = 0;
	return {
		Map: function(id)
		{
			_MapFunc[id] = true;
		},
		isMap: function(id)
		{
			return _MapFunc[id] != undefined;
		},
		Next: function()
		{
			var s = c.length;
			var iscode = false;
			var isinclude = false;
			var cs;
			var include; 
			var fsinclude;
			var lab;
			var map;
			while(!isLab(c[i]) && i < s)
			{
				
				if(c[i] == "#" && c[i+1] == "j" && c[i+2] == "s" && c[i+3] == "<")
				{
					isinclude = true;
					i+=4;
					var ii = c.indexOf(">", i);
					include = c.substring(i, ii);
					
					i = ii + 1;
					
					break;
					
				}
				else if(c[i] == "#" && c[i+1] == "j" && c[i+2] == "s")
				{
					iscode = true;
					i+=3;   
					var ii = c.indexOf("#endjs", i);
					cs = c.substring(i, ii);
					
					i = ii + 6;
					
					break;
				}
				
				$out(c[i]);
				i++;
			}
			
			if(isinclude)
			{
				var fpath = "";
				for(var i3 = 0; i3 < $includeDir.length; i3++)
				{
					var path = $includeDir[i3];
					
					if(fs.existsSync(path + include))
					{
						fpath = path + include;
						break;
					}
				}
				fsinclude = fs.readFileSync(fpath).toString();
			}
			else if(!iscode)
			{
				var i1 = i;
				while(isLab(c[i1]) && i1 < s)
				{
					i1++;
				}
				var lab1 = c.substring(i1, i);
				i = i1;
				
				
				if(this.isMap(lab1))
				{
					if(isBracket(c[i]))
					{
						i++;
						var b = 1;
						i1 = i;
						while(b > 0)
						{
							if(isLBracket(c[i1])) 
							{
								b++;
								i1++;
							}
							else if(isRBracket(c[i1])) 
							{
								b--;
								i1++;
							}
							else if(isString(c[i1]))
							{
								//ignore strings. 
								if(c[i1] == "\"")
								{
									i1++;
									while(c[i1] != "\"")
									{
										if(c[i1] == "\\") i1+=2;
										else i1++;
									}
									i1++;
								}
								else if(___c[___ci] == "'")
								{
									i1++;
									while(c[i1] != "'")
									{
										if(c[i1] == "\\") i1+=2;
										else i1++;
									}
									i1++;
								}
								else if(c[i1] == "`")
								{
									i1++;
									while(c[i1] != "`")
									{
										if(c[i1] == "\\") i1+=2;
										else i1++;
									}
									i1++;
								}
							}
							else
							{
								i1++;
							}
						}//end while
						
						map = lab1 + c.substring(i-1, i1);
						i = i1;
					}
					else
					{
					
						map = lab1;
					}
				}
				else
				{
					lab = lab1;
				}
			}
			return {label: lab, code: cs, end: i>= s-1, map: map, include: fsinclude};
		},//end Next
		fsWrite: function(fname, c)
		{
			fs.writeFileSync(fname, c);
		},
		fsAppend: function(fname, c)
		{
			fs.appendFileSync(fname, c);
		}, 
		fsRead: function(fname)
		{
			return fs.readFileSync(fname).toString();
		},
		cout: function(txt)
		{
			process.stdout.write(txt + "");
		},
		fsStat: function(fname)
		{
			return fs.statSync(fname);
		}
		
	};
}
function processFile($lib)
{
	var end = false;
	var item = {end: false};
	while(!item.end)
	{
		item = $lib.Next();
		if(item.code != undefined)
		{
			eval(item.code);
		}
		else if(item.map!= undefined)
		{
			$out(eval(item.map));
		}
		else if(item.include != undefined)
		{
			eval(item.include);
		}
		else
		{
			$out(item.label);
		}
	}
}

fs.readdir("./", function(err, items)
{
	for(var i in items)
	{
		if(items[i].endsWith("_js"))
		{
			processFile(lib(fs.readFileSync(items[i]).toString()));
		}
	}
	
	
});



	{
		return cc == ")" ||  cc == "]" ||  cc == "}";
	}
	function isString(cc)
	{
		return cc == "\"" | cc == "'" | cc == "`";
	}
	var i = 0;
	return {
		Map: function(id)
		{
			_MapFunc[id] = true;
		},
		isMap: function(id)
		{
			return _MapFunc[id] != undefined;
		},
		Next: function()
		{
			var s = c.length;
			var iscode = false;
			var isinclude = false;
			var cs;
			var include; 
			var fsinclude;
			var lab;
			var map;
			while(!isLab(c[i]) && i < s)
			{
				
				if(c[i] == "#" && c[i+1] == "j" && c[i+2] == "s" && c[i+3] == "<")
				{
					isinclude = true;
					i+=4;
					var ii = c.indexOf(">", i);
					include = c.substring(i, ii);
					
					i = ii + 1;
					
					break;
					
				}
				else if(c[i] == "#" && c[i+1] == "j" && c[i+2] == "s")
				{
					iscode = true;
					i+=3;   
					var ii = c.indexOf("#endjs", i);
					cs = c.substring(i, ii);
					
					i = ii + 6;
					
					break;
				}
				
				$out(c[i]);
				i++;
			}
			
			if(isinclude)
			{
				var fpath = "";
				for(var path in $includeDir)
				{
					if(fs.existsSync(path + include)
					{
						fpath = path + include;
					}
				}
				fsinclude = fs.readFileSync(fpath).toString();
			}
			else if(!iscode)
			{
				
				
				
				var i1 = i;
				while(isLab(c[i1]) && i1 < s)
				{
					i1++;
				}
				var lab1 = c.substring(i1, i);
				i = i1;
				
				
				if(this.isMap(lab1))
				{
					if(isBracket(c[i]))
					{
						i++;
						var b = 1;
						i1 = i;
						while(b > 0)
						{
							if(isLBracket(c[i1])) 
							{
								b++;
								i1++;
							}
							else if(isRBracket(c[i1])) 
							{
								b--;
								i1++;
							}
							else if(isString(c[i1]))
							{
								//ignore strings. 
								if(c[i1] == "\"")
								{
									i1++;
									while(c[i1] != "\"")
									{
										if(c[i1] == "\\") i1+=2;
										else i1++;
									}
									i1++;
								}
								else if(___c[___ci] == "'")
								{
									i1++;
									while(c[i1] != "'")
									{
										if(c[i1] == "\\") i1+=2;
										else i1++;
									}
									i1++;
								}
								else if(c[i1] == "`")
								{
									i1++;
									while(c[i1] != "`")
									{
										if(c[i1] == "\\") i1+=2;
										else i1++;
									}
									i1++;
								}
							}
							else
							{
								i1++;
							}
						}//end while
						
						map = lab1 + c.substring(i-1, i1);
						i = i1;
					}
					else
					{
					
						map = lab1;
					}
				}
				else
				{
					lab = lab1;
				}
			}
			return {label: lab, code: cs, end: i>= s-1, map: map, include: fsinclude};
		},//end Next
		fsWrite: function(fname, c)
		{
			fs.writeFileSync(fname, c);
		},
		fsAppend: function(fname, c)
		{
			fs.appendFileSync(fname, c);
		}, 
		fsRead: function(fname)
		{
			return fs.readFileSync(fname).toString();
		},
		cout: function(txt)
		{
			process.stdout.write(txt + "");
		},
		fsStat: function(fname)
		{
			return fs.statSync(fname);
		}
		
	};
}
function processFile($lib)
{
	var end = false;
	var item = {end: false};
	while(!item.end)
	{
		item = $lib.Next();
		if(item.code != undefined)
		{
			eval(item.code);
		}
		else if(item.map!= undefined)
		{
			$out(eval(item.map));
		}
		else if(item.include != undefined)
		{
			eval(item.include);
		}
		else
		{
			$out(item.label);
		}
	}
}

fs.readdir("./", function(err, items)
{
	for(var i in items)
	{
		if(items[i].endsWith("_js"))
		{
			processFile(lib(fs.readFileSync(items[i]).toString()));
		}
	}
	
	
});


