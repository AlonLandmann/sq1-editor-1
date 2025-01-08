import TeX from "./TeX";

export default function Derivation({ tex }) {
    const lines = tex.split("||");
    const table = lines.map(line => line.split("|"));

    return (
        <div className="flex flex-col gap-1">
            {table.map((line, i) => (
                <div
                    key={"line" + i}
                    className="grow grid gap-[10px]"
                    style={{ gridTemplateColumns: "3fr 1fr 7fr 4fr" }}
                >
                    <div className="min-w-0 break-words"><TeX tex={`[${line[0]}]`} /></div>
                    <div className="min-w-0 break-words"><TeX tex={`[(${i + 1})]`} /></div>
                    <div className="min-w-0 break-words"><TeX tex={`${line[1]}`} /></div>
                    <div className="min-w-0 break-words"><TeX tex={`${line[2]}`} /></div>
                </div>
            ))}
        </div>
    );
};