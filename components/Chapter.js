import { useState } from "react";
import Section from "./Section";

export default function Chapter({ chapter }) {
    const [collapsed, setCollapsed] = useState(false);

    async function handleAddSection(e) {
        e.stopPropagation();

        const res = await fetch(`/api/add-section?chapterId=${chapter.id}`, { method: "POST" });
        const json = await res.json();

        if (json.success) {
            window.location.reload();
        }
    }

    async function handleDeleteChapter(e) {
        e.stopPropagation();
        
        if (window.confirm("Delete chapter?")) {
            const res = await fetch(`/api/delete-chapter?chapterId=${chapter.id}`, { method: "DELETE" });
            const json = await res.json();

            if (json.success) {
                window.location.reload();
            } else {
                window.alert(json.message);
            }
        }
    }

    async function handleRenameChapter(e) {
        e.stopPropagation();
        
        const renameValue = window.prompt("Enter a new name: ");

        const res = await fetch(`/api/rename-chapter?chapterId=${chapter.id}`, {
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
            <div
                className="p-2 flex gap-3 items-center bg-neutral-700 text-neutral-100"
                onClick={() => setCollapsed(p => !p)}
            >
                <div className="font-medium text-xl w-10">
                    {chapter.index + 1}
                </div>
                <div className="font-medium text-xl">
                    {chapter.name}
                </div>
                <div className="flex gap-2 ml-auto">
                    <button
                        className="w-8 h-8 flex items-center justify-center text-sm border border-neutral-600 rounded-sm hover:text-neutral-400"
                        onClick={handleAddSection}
                    >
                        <i className="bi bi-plus-lg"></i>
                    </button>
                    <button
                        className="w-8 h-8 flex items-center justify-center text-sm border border-neutral-600 rounded-sm hover:text-neutral-400"
                        onClick={handleRenameChapter}
                    >
                        <i className="bi bi-input-cursor"></i>
                    </button>
                    <button
                        className="w-8 h-8 flex items-center justify-center text-sm border border-neutral-600 rounded-sm hover:text-neutral-400"
                        onClick={handleDeleteChapter}
                    >
                        <i className="bi bi-trash3"></i>
                    </button>
                </div>
            </div>
            <div>
                {!collapsed && chapter.sections.map(section => (
                    <Section
                        key={section.id}
                        chapterIndex={chapter.index}
                        section={section}
                    />
                ))}
            </div>
        </div>
    );
};