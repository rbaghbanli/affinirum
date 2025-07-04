import { Affinirum } from "../src/index.js";

describe("Function Argument test", ()=> {
	it("parses and evaluates full script", ()=> {
		const script = new Affinirum(`
const cnum = 1000 + myvr;
const cint = 01000;
const cstr = "thestring";
var vnum = cnum + cstr.Length;
var vint = if myvr > 1000 {cint + cnum} else {cint - cnum};
var vstr = cstr + cnum;
const carr1 = [1, 2, 3, 4];
var varr2 = [5, 6, 7, 8] + carr1;
const cobj = [ "a": 1, "b": 2 ];
var vobj = Object.Merge([ "x": 3, "abcdef": 4 ], cobj);
const cfunc = ~string (x: integer, y: integer, z: integer) {
  (x + y + z + cnum + vint).Format
};
var vfunc = ~string (f: ~string(integer, integer, integer)) {
  f(1, 2, cobj."a" + vobj."b")
};
vfunc(cfunc)
		`);
		expect(script.evaluate({ myvr: 100 }) as string).toBe("1006.0");
	});
});
