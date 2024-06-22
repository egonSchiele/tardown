"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tarsec_1 = require("tarsec");
// define a parser
const parser = (0, tarsec_1.seqR)((0, tarsec_1.str)("hello"), tarsec_1.space, (0, tarsec_1.str)("world"));
// then use it
parser("hello world"); // success
parser("hello there"); // failure
