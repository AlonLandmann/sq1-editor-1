import { v4 } from "uuid";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import Reference from "./Reference";
import Derivation from "./Derivation";
import Table from "./Table";
import List from "./List";
import Highlight from "./Highlight";

export default function TeX({ tex }) {
    let parsed = [];
    let mode = "text";
    let buffer = "";

    const mathSplits = /^(=|<|>|\\neq|\\geq|\\leq)/;
    const escapePattern = /^~(\[|\]|§|£|#|\$|\*|%|>|<|=|\\neq|\\geq|\\leq)/;

    for (let i = 0; i <= tex.length; i++) {
        if (escapePattern.test(tex.slice(i))) {
            buffer = buffer.concat(tex[i + 1]);
            i++;
        } else if (mode === "text") {
            if (i === tex.length) { pushText() }
            else if (tex.slice(i, i + 2) === "[[") { pushText(); mode = "blockMath"; i++ }
            else if (tex[i] === "[") { pushText(); mode = "math" }
            else if (tex[i] === "§") { pushText(); mode = "textRef" }
            else if (tex[i] === "£") { pushText(); mode = "derivation" }
            else if (tex[i] === "#") { pushText(); mode = "table" }
            else if (tex[i] === "$") { pushText(); mode = "highlight" }
            else if (tex[i] === ">") { pushText(); mode = "bold" }
            else if (tex[i] === "<") { pushText(); mode = "italic" }
            else if (tex[i] === "*") { pushText(); mode = "list" }
            else if (tex[i] === "%") { pushText(); pushNewLine() }
            else { buffer += tex[i] }
        } else if (mode === "textRef") {
            if (tex[i] === "§") { pushTextRef(); mode = "text" }
            else { buffer += tex[i] }
        } else if (mode === "blockMath") {
            if (tex.slice(i, i + 2) === "]]") { pushBlockMath(); mode = "text"; i++ }
            else if (tex[i] === "§") { pushBlockMath(); pushSpacer(); mode = "blockMathRef" }
            else if (mathSplits.test(tex.slice(i))) { pushBlockMath(); pushSpacer(); buffer = tex[i] }
            else { buffer += tex[i] }
        } else if (mode === "blockMathRef") {
            if (tex[i] === "§") { pushMathRef(); pushSpacer(); mode = "blockMath" }
            else { buffer += tex[i] }
        } else if (mode === "math") {
            if (tex[i] === "]") { pushMath(); mode = "text" }
            else if (tex[i] === "§") { pushMath(); pushSpacer(); mode = "mathRef" }
            else if (mathSplits.test(tex.slice(i))) { pushMath(); pushSpacer(); buffer = tex[i] }
            else { buffer += tex[i] }
        } else if (mode === "mathRef") {
            if (tex[i] === "§") { pushMathRef(); pushSpacer(); mode = "math" }
            else { buffer += tex[i] }
        } else if (mode === "derivation") {
            if (tex[i] === "£") { pushDerivation(); mode = "text" }
            else { buffer += tex[i] }
        } else if (mode === "table") {
            if (tex[i] === "#") { pushTable(); mode = "text" }
            else { buffer += tex[i] }
        } else if (mode === "highlight") {
            if (tex[i] === "$") { pushHighlight(); mode = "text" }
            else { buffer += tex[i] }
        } else if (mode === "bold") {
            if (tex[i] === ">") { pushBold(); mode = "text" }
            else { buffer += tex[i] }
        } else if (mode === "italic") {
            if (tex[i] === "<") { pushItalic(); mode = "text" }
            else { buffer += tex[i] }
        } else if (mode === "list") {
            if (tex[i] === "*") { pushList(); mode = "text" }
            else { buffer += tex[i] }
        }
    }

    function pushText() {
        parsed.push(
            <span key={v4()}>{buffer}</span>
        );

        buffer = "";
    }

    function pushNewLine() {
        parsed.push(
            <div key={v4()} style={{ height: "25px" }}></div>
        );
    }

    function pushTextRef() {
        let content, refNum, subNum;

        if (buffer.split(",").length === 1) {
            content = buffer;
            refNum = Number(buffer.split(".")[0]);
            subNum = Number(buffer.split(".")[1]);
        } else {
            content = buffer.split(",")[0].replace(/~X/g, buffer.split(",")[1]);
            refNum = Number(buffer.split(",")[1].split(".")[0]);
            subNum = Number(buffer.split(",")[1].split(".")[1]);
        }

        parsed.push(
            <Reference key={v4()} refNum={refNum} subNum={subNum}>
                {content}
            </Reference>
        );

        buffer = "";
    }

    function pushMath() {
        parsed.push(
            <InlineMath key={v4()}>{buffer}</InlineMath>
        )

        buffer = "";
    }

    function pushBlockMath() {
        parsed.push(
            <div key={v4()} style={{ display: "inline-block" }}>
                <BlockMath>{buffer}</BlockMath>
            </div>
        );

        buffer = "";
    }

    function pushSpacer() {
        parsed.push(
            <span key={v4()} style={{ marginRight: "0.2778em" }}></span>
        );
    }

    function pushMathRef() {
        let content = buffer.split(",")[0];
        let refNum = Number(buffer.split(",")[1].split(".")[0]);
        let subNum = Number(buffer.split(",")[1].split(".")[1]);

        parsed.push(
            <Reference key={v4()} refNum={refNum} subNum={subNum}>
                <InlineMath>
                    {content}
                </InlineMath>
            </Reference>
        );

        buffer = "";
    }

    function pushDerivation() {
        parsed.push(
            <Derivation key={v4()} tex={buffer} />
        );

        buffer = "";
    }
    function pushTable() {
        parsed.push(
            <Table key={v4()} tex={buffer} />
        );

        buffer = "";
    }

    function pushHighlight() {
        parsed.push(
            <Highlight key={v4()} tex={buffer} />
        );

        buffer = "";
    }

    function pushBold() {
        parsed.push(
            <span key={v4()} className="font-bold">{buffer}</span>
        );

        buffer = "";
    }

    function pushItalic() {
        parsed.push(
            <span key={v4()} className="italic">{buffer}</span>
        );

        buffer = "";
    }

    function pushList() {
        parsed.push(
            <List key={v4()} tex={buffer} />
        );

        buffer = "";
    }

    return (
        <div>
            {parsed}
        </div>
    );
};