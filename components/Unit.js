import { useState } from "react";
import Part from "./Part";
import { produce } from "immer";

export default function Unit({ chapterIndex, sectionIndex, unit, setContent }) {
    const [collapsed, setCollapsed] = useState(false);
    const [editingContent, setEditingContent] = useState(false);

    async function handleAddPart(e) {
        e.stopPropagation();

        const res = await fetch(`/api/add-part?unitId=${unit.id}`, { method: "POST" });
        const json = await res.json();

        if (json.success) {
            window.location.reload();
        }
    }

    function handleEditContent(e) {
        e.stopPropagation();

        setEditingContent(p => !p);
    }

    function handleContentChange(e) {
        setContent(produce(draft => {
            draft[chapterIndex].sections[sectionIndex].units[unit.index].content = e.target.value;
        }));
    }

    async function handleDeleteUnit(e) {
        e.stopPropagation();

        if (window.confirm("Delete unit?")) {
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
                <div className="text-base w-10">
                    {chapterIndex + 1}.{sectionIndex + 1}.{unit.index + 1}
                </div>
                <div className="text-base w-6 text-neutral-500">
                    {unit.type.charAt(0).toUpperCase()}
                </div>
                {unit.name &&
                    <div className="text-base">
                        {unit.name}
                    </div>
                }
                <div className="flex gap-2 ml-auto">
                    {unit.type !== "paragraph" &&
                        <button
                            className="w-8 h-8 flex items-center justify-center text-sm border rounded-sm hover:text-neutral-500"
                            onClick={handleAddPart}
                        >
                            <i className="bi bi-plus-lg"></i>
                        </button>
                    }
                    <button
                        className="w-8 h-8 flex items-center justify-center text-sm border rounded-sm hover:text-neutral-500"
                        onClick={handleEditContent}
                    >
                        {editingContent
                            ? <i className="bi bi-x-lg"></i>
                            : <i className="bi bi-pen"></i>
                        }
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
            {editingContent &&
                <div className="flex">
                    <textarea
                        className="w-full outline-none bg-neutral-50 p-2 font-mono text-xs text-neutral-800"
                        spellcheck="false"
                        rows={10}
                        onChange={handleContentChange}
                    >
                        {unit.content}
                    </textarea>
                    <button className="min-w-12 text-sm border-l border-r hover:text-neutral-500">
                        <i className="bi bi-check2"></i>
                    </button>
                </div>
            }
            <div>
                {!collapsed && unit.parts.map(part => (
                    <Part
                        key={part.id}
                        chapterIndex={chapterIndex}
                        sectionIndex={sectionIndex}
                        unitIndex={unit.index}
                        part={part}
                        setContent={setContent}
                    />
                ))}
            </div>
        </div>
    );
};