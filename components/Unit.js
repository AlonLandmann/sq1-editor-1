import { useState } from "react";
import Part from "./Part";

export default function Unit({ chapterIndex, sectionIndex, unit }) {
    const [collapsed, setCollapsed] = useState(false);

    async function handleAddPart(e) {
        e.stopPropagation();

        const res = await fetch(`/api/add-part?unitId=${unit.id}`, { method: "POST" });
        const json = await res.json();

        if (json.success) {
            window.location.reload();
        }
    }

    async function handleDeleteUnit(e) {
        e.stopPropagation();

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

    async function handleRenameUnit(e) {
        e.stopPropagation();

        const renameValue = window.prompt("Enter a new name: ");

        const res = await fetch(`/api/rename-unit?unitId=${unit.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ renameValue }),
        });

        const json = await res.json();

        if (json.success) {
            window.location.reload();
        }
    }

    return (
        <div>
            <div
                className="p-2 flex gap-3 items-center"
                onClick={() => setCollapsed(p => !p)}
            >
                <div className="text-base">
                    {chapterIndex + 1}.{sectionIndex + 1}.{unit.index + 1}
                </div>
                <div className="text-base">
                    {unit.name}
                </div>
                <div>Type: {unit.type}</div>
                <div>Content: {unit.content}</div>
                <div>Proof: {unit.proof}</div>
                <div className="flex gap-2 ml-auto">
                    <button
                        className="w-8 h-8 flex items-center justify-center text-sm border rounded-sm hover:text-neutral-500"
                        onClick={handleAddPart}
                    >
                        <i className="bi bi-plus-lg"></i>
                    </button>
                    <button
                        className="w-8 h-8 flex items-center justify-center text-sm border rounded-sm hover:text-neutral-500"
                        onClick={handleRenameUnit}
                    >
                        <i className="bi bi-input-cursor"></i>
                    </button>
                    <button
                        className="w-8 h-8 flex items-center justify-center text-sm border rounded-sm hover:text-neutral-500"
                        onClick={handleDeleteUnit}
                    >
                        <i className="bi bi-trash3"></i>
                    </button>
                </div>
            </div>
            <div>
                {!collapsed && unit.parts.map(part => (
                    <Part
                        key={part.id}
                        chapterIndex={chapterIndex}
                        sectionIndex={sectionIndex}
                        unitIndex={unit.index}
                        part={part}
                    />
                ))}
            </div>
        </div>
    );
};