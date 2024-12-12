import Unit from "./Unit";

export default function Section({ section }) {
    async function addUnit() {
        const res = await fetch(`/api/add-unit?sectionId=${section.id}`, { method: "POST" });
        const json = await res.json();

        if (json.success) {
            window.location.reload();
        }
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
            <div className="ml-16">
                {section.units.map(unit => (
                    <Unit
                        key={unit.id}
                        unit={unit}
                    />
                ))}
            </div>
        </div>
    );
};