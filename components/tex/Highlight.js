import TeX from "./TeX";

export default function Highlight({ tex }) {
  return (
    <div className="py-5 px-10 flex flex-col gap-5">
      {tex.split("||||").map((row, i) => (
        <div key={"row" + i} className="flex items-center justify-center gap-6">
          {row.split("|||").map((item, j) => (
            <TeX key={"row" + i + "item" + j} tex={item} />
          ))}
        </div>
      ))}
    </div>
  );
};