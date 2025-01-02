import { produce } from "immer";
import { useMemo, useState } from "react";

export default function Part({ chapterIndex, sectionIndex, unitIndex, part, setContent }) {
    const [editingContent, setEditingContent] = useState(false);
    const originalContent = useMemo(() => part.content, []);
    const contentIsAltered = part.content !== originalContent;

    function handleEditContent(e) {
        e.stopPropagation();

        setEditingContent(p => !p);
    }

    function handleContentChange(e) {
        setContent(produce(draft => {
            draft[chapterIndex].sections[sectionIndex].units[unitIndex].parts[part.index].content = e.target.value;
        }));
    }

    function handleResetContentEdit() {
        if (window.confirm("Are you sure you'd like to reset the content to its original state?")) {
            setContent(produce(draft => {
                draft[chapterIndex].sections[sectionIndex].units[unitIndex].parts[part.index].content = originalContent;
            }));
        }
    }

    async function handleSubmitContentEdit() {

    }

    async function handleDeletePart() {
        if (window.confirm("Delete part?")) {
            const res = await fetch(`/api/delete-part?partId=${part.id}`, { method: "DELETE" });
            const json = await res.json();

            if (json.success) {
                window.location.reload();
            }
        }
    }

    async function handleRenamePart() {
        const renameValue = window.prompt("Enter a new name: ");

        const res = await fetch(`/api/rename-part?partId=${part.id}`, {
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
            <div className="p-2 flex gap-3 items-center">
                <div className="text-sm w-10">
                    {chapterIndex + 1}.{sectionIndex + 1}.{unitIndex + 1}.{part.index + 1}
                </div>
                {part.name &&
                    <div className="text-sm">
                        {part.name}
                    </div>
                }
                <div className="flex gap-2 ml-auto">
                    <button
                        onClick={handleEditContent}
                        className={`
                            w-8 h-8 flex items-center justify-center text-sm border rounded-sm hover:text-neutral-500
                            ${contentIsAltered ? " border-orange-200 text-orange-500 hover:text-orange-400" : ""}
                        `}
                    >
                        {editingContent
                            ? <i className="bi bi-x-lg"></i>
                            : <i className="bi bi-pen"></i>
                        }
                    </button>
                    <button
                        className="w-8 h-8 flex items-center justify-center text-sm border rounded-sm hover:text-neutral-500"
                        onClick={handleRenamePart}
                    >
                        <i className="bi bi-input-cursor"></i>
                    </button>
                    <button
                        className="w-8 h-8 flex items-center justify-center text-sm border rounded-sm hover:text-neutral-500"
                        onClick={handleDeletePart}
                    >
                        <i className="bi bi-trash3"></i>
                    </button>
                </div>
            </div>
            {editingContent &&
                <div className="flex">
                    <textarea
                        className="w-full outline-none bg-neutral-50 p-2 font-mono text-xs text-neutral-800"
                        spellCheck="false"
                        rows={10}
                        onChange={handleContentChange}
                        value={part.content}
                    >

                    </textarea>
                    <div className="grid grid-rows-2 min-w-12 border-l border-r gap-[1px] bg-gray-200">
                        <button
                            className="text-sm text-neutral-400 hover:text-neutral-700 bg-white"
                            onClick={handleResetContentEdit}
                        >
                            <i className="bi bi-arrow-counterclockwise"></i>
                        </button>
                        <button
                            className="text-sm text-neutral-400 hover:text-neutral-700 bg-white"
                            onClick={handleSubmitContentEdit}
                        >
                            <i className="bi bi-check2"></i>
                        </button>
                    </div>
                </div>
            }
        </div>
    );
};