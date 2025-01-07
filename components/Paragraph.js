export default function Paragraph({ unit }) {
  return (
    <div className="px-6 text-justify">
      {unit.content}
    </div>
  );
};