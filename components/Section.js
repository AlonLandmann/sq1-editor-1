import { useState } from "react";
import Unit from "./Unit";

export default function Section({ chapterIndex, section }) {
    const [collapsed, setCollapsed] = useState(false);

    async function handleAddUnit() {
        const res = await fetch(`/api/add-unit?sectionId=${section.id}`, { method: "POST" });
        const json = await res.json();

        if (json.success) {
            window.location.reload();
        }
    }

    async function handleDeleteSection() {
        if (confirm("Delete section?")) {
            const res = await fetch(`/api/delete-section?sectionId=${section.id}`, { method: "DELETE" });
            const json = await res.json();

            if (json.success) {
                window.location.reload();
            } else {
                window.alert(json.message);
            }
        }
    }

    async function handleRenameSection() {
        const renameValue = window.prompt("Enter a new name: ");

        const res = await fetch(`/api/rename-section?sectionId=${section.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ renameValue }),
        });

        const json = await res.json();

        if (json.success) {
            window.location.reload();
        } else {
            window.alert(json.message);
        }
    }

    return (
        <div>
            <div className="p-2 flex gap-3 items-center bg-neutral-100">
                <button
                    className="w-8 h-8 flex items-center justify-center text-xs hover:text-neutral-500"
                    onClick={() => setCollapsed(p => !p)}
                >
                    {collapsed
                        ? <i className="bi bi-chevron-right"></i>
                        : <i className="bi bi-chevron-down"></i>
                    }
                </button>
                <div className="text-lg">
                    {chapterIndex + 1}.{section.index + 1}
                </div>
                <div className="text-lg">
                    {section.name}
                </div>
                <div className="flex gap-2 ml-auto">
                    <button
                        className="w-8 h-8 flex items-center justify-center text-sm border rounded-sm hover:text-neutral-500"
                        onClick={handleAddUnit}
                    >
                        <i className="bi bi-plus-lg"></i>
                    </button>
                    <button
                        className="w-8 h-8 flex items-center justify-center text-sm border rounded-sm hover:text-neutral-500"
                        onClick={handleRenameSection}
                    >
                        <i className="bi bi-input-cursor"></i>
                    </button>
                    <button
                        className="w-8 h-8 flex items-center justify-center text-sm border rounded-sm hover:text-neutral-500"
                        onClick={handleDeleteSection}
                    >
                        <i className="bi bi-trash3"></i>
                    </button>
                </div>
            </div>
            <div>
                {!collapsed && section.units.map(unit => (
                    <Unit
                        key={unit.id}
                        chapterIndex={chapterIndex}
                        sectionIndex={section.index}
                        unit={unit}
                    />
                ))}
            </div>
        </div>
    );
};