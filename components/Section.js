import { useState } from "react";
import Unit from "./Unit";

export default function Section({ chapterIndex, section, setContent }) {
    const [collapsed, setCollapsed] = useState(false);

    async function handleAddUnit(e) {
        e.stopPropagation();

        const type = window.prompt("Select unit type: n, d, a, t, tx, p.");

        const res = await window.fetch(`/api/add-unit?sectionId=${section.id}&type=${type}`, { method: "POST" });
        const json = await res.json();

        if (json.success) {
            window.location.reload();
        } else {
            window.alert(json.message);
        }
    }

    async function handleRenameSection(e) {
        e.stopPropagation();

        const renameValue = window.prompt("Enter a new name: ");

        const res = await window.fetch(`/api/rename-section?sectionId=${section.id}`, {
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

    async function handleMoveSection(e) {
        e.stopPropagation();

        const target = window.prompt("Enter the target index: ");

        if (target === null) { 
            return;
        }

        const res = await window.fetch(`/api/move-section?chapterId=${section.chapterId}&sectionId=${section.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                origin: section.index,
                target: Number(target),
            }),
        });

        const json = await res.json();

        if (json.success) {
            window.location.reload();
        } else {
            window.alert(json.message);
        }
    }
    
    async function handleDeleteSection(e) {
        e.stopPropagation();

        if (window.confirm("Delete section?")) {
            const res = await window.fetch(`/api/delete-section?sectionId=${section.id}`, { method: "DELETE" });
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
            <div
                className="p-2 flex gap-3 items-center bg-neutral-100"
                onClick={() => setCollapsed(p => !p)}
            >
                <div className="text-lg w-10">
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
                    <div className="w-8 h-8"></div>
                    <div className="w-8 h-8"></div>
                    <button
                        className="w-8 h-8 flex items-center justify-center text-sm border rounded-sm hover:text-neutral-500"
                        onClick={handleRenameSection}
                    >
                        <i className="bi bi-input-cursor"></i>
                    </button>
                    <button
                        className="w-8 h-8 flex items-center justify-center text-sm border rounded-sm hover:text-neutral-500"
                        onClick={handleMoveSection}
                    >
                        <i className="bi bi-arrow-down-up"></i>
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
                        setContent={setContent}
                    />
                ))}
            </div>
        </div>
    );
};