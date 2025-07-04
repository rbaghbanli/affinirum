import { ParserFrame } from "./ParserFrame.js";
import { Value } from "./Value.js";
import { Type } from "./Type.js";

export abstract class Node extends ParserFrame {

	constructor(
		frame: ParserFrame,
	) {
		super(frame.expr, frame.start, frame.end);
	}

	abstract type: Type;
	abstract compile(type: Type): Node;
	abstract evaluate(): Value;

	get constant(): boolean {
		return false;
	}

	protected reduceType(type: Type) {
		const compiledType = this.type.reduce(type);
		if (compiledType) {
			return compiledType;
		}
		this.throwTypeError(type);
	}

	protected throwTypeError(type: Type): never {
		return this.throwError(`type ${this.type} mismatch with expected type ${type}`);
	}

	toString(ident: number = 0): string {
		return "  ".repeat(ident) + `[${this._start}:${this.end}] <${this.type}>`;
	}

}
