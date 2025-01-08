import TeX from "./TeX";

export default function List({ tex }) {
  return (
    <div className="py-5 px-4 flex flex-col gap-4">
      {tex.split("__").map((item, i) => (
        <div key={"item" + i} className="flex justify-center gap-4 text-left">
          <i className="bi bi-circle-fill text-[4px]"></i>
          <TeX tex={item} />
        </div>
      ))}
    </div>
  );
};