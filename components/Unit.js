import Part from "./Part";

export default function Unit({ unit }) {
    async function addPart() {
        const res = await fetch(`/api/add-part?unitId=${unit.id}`, { method: "POST" });
        const json = await res.json();

        if (json.success) {
            window.location.reload();
        }
    }

    async function handleDeleteUnit() {
        if (confirm("Delete unit?")) {
            const res = await fetch(`/api/delete-unit?unitId=${unit.id}`, { method: "DELETE" });
            const json = await res.json();

            if (json.success) {
                window.location.reload();
            } else {
                window.alert(json.message);
            }
        }
    }

    return (
        <div>
            <div className="flex gap-2">
                <button
                    className="py-1 px-2 text-sm underline hover:text-neutral-500"
                    onClick={addPart}
                >
                    Add part
                </button>
                <button
                    className="py-1 px-2 text-sm underline hover:text-neutral-500"
                    onClick={handleDeleteUnit}
                >
                    Delete unit
                </button>
                <div>Id: {unit.id}</div>
                <div>Index: {unit.index}</div>
                <div>Type: {unit.type}</div>
                <div>Name: {unit.name}</div>
                <div>Content: {unit.content}</div>
                <div>Proof: {unit.proof}</div>
            </div>
            <div className="ml-16">
                {unit.parts.map(part => (
                    <Part
                        key={part.id}
                        part={part}
                    />
                ))}
            </div>
        </div>
    );
};