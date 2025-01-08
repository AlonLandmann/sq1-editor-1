import TeX from "./tex/TeX";

export default function Paragraph({ unit }) {
  return (
    <div className="px-6 text-justify">
      <TeX tex={unit.content} />
    </div>
  );
};