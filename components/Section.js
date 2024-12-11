export default function Section({ section }) {
  async function addUnit() {

  }

  return (
    <div>
      <div className="flex gap-2">
        <button
          className="py-1 px-2 text-sm underline hover:text-neutral-500"
          onClick={addUnit}
        >
          Add unit
        </button>
        <div>Id: {section.id}</div>
        <div>Index: {section.index}</div>
        <div>Name: {section.name}</div>
      </div>
    </div>
  );
};