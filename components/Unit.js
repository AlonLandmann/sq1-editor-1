import { useMemo, useState } from "react";
import Part from "./Part";
import { produce } from "immer";

export default function Unit({ chapterIndex, sectionIndex, unit, setContent }) {
    const [collapsed, setCollapsed] = useState(false);
    const [editingContent, setEditingContent] = useState(false);
    const [editingProof, setEditingProof] = useState(false);
    const originalContent = useMemo(() => unit.content, []);
    const originalProof = useMemo(() => unit.proof, []);
    const contentIsAltered = unit.content !== originalContent;
    const proofIsAltered = unit.proof !== originalProof;

    async function handleAddPart(e) {
        e.stopPropagation();

        const res = await window.fetch(`/api/add-part?unitId=${unit.id}`, { method: "POST" });
        const json = await res.json();

        if (json.success) {
            window.location.reload();
        }
    }

    function handleEditContent(e) {
        e.stopPropagation();

        setEditingContent(p => !p);
    }

    function handleEditProof(e) {
        e.stopPropagation();

        setEditingProof(p => !p);
    }

    function handleContentChange(e) {
        setContent(produce(draft => {
            draft[chapterIndex].sections[sectionIndex].units[unit.index].content = e.target.value;
        }));
    }

    function handleProofChange(e) {
        setContent(produce(draft => {
            draft[chapterIndex].sections[sectionIndex].units[unit.index].proof = e.target.value;
        }));
    }

    function handleResetContentEdit() {
        if (window.confirm("Are you sure you'd like to reset the content to its original state?")) {
            setContent(produce(draft => {
                draft[chapterIndex].sections[sectionIndex].units[unit.index].content = originalContent;
            }));
        }
    }

    function handleResetProofEdit() {
        if (window.confirm("Are you sure you'd like to reset the proof to its original state?")) {
            setContent(produce(draft => {
                draft[chapterIndex].sections[sectionIndex].units[unit.index].proof = originalProof;
            }));
        }
    }

    async function handleSubmitContentEdit() {
        if (!contentIsAltered) {
            return window.alert("Content is unaltered");
        }

        const res = await window.fetch(`/api/update-unit-content?unitId=${unit.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: unit.content }),
        });

        const json = await res.json();

        if (json.success) {
            window.location.reload();
        } else {
            window.alert("An unexpected error occurred.");
        }
    }

    async function handleSubmitProofEdit() {
        if (!proofIsAltered) {
            return window.alert("Proof is unaltered");
        }

        const res = await window.fetch(`/api/update-unit-proof?unitId=${unit.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ proof: unit.proof }),
        });

        const json = await res.json();

        if (json.success) {
            window.location.reload();
        } else {
            window.alert("An unexpected error occurred.");
        }
    }

    async function handleRenameUnit(e) {
        e.stopPropagation();

        const renameValue = window.prompt("Enter a new name: ");

        const res = await window.fetch(`/api/rename-unit?unitId=${unit.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ renameValue }),
        });

        const json = await res.json();

        if (json.success) {
            window.location.reload();
        }
    }

    async function handleMoveUnit(e) {
        e.stopPropagation();

        const target = window.prompt("Enter the target index: ");

        if (target === null) { 
            return;
        }

        const res = await window.fetch(`/api/move-unit?sectionId=${unit.sectionId}&unitId=${unit.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                origin: unit.index,
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

    async function handleDeleteUnit(e) {
        e.stopPropagation();

        if (window.confirm("Delete unit?")) {
            const res = await window.fetch(`/api/delete-unit?unitId=${unit.id}`, { method: "DELETE" });
            const json = await res.json();

            if (json.success) {
                window.location.reload();
            } else {
                window.alert(json.message);
            }
        }
    }

    return (
        <div className="border-t border-b border-white hover:border-neutral-500">
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
                    {typeof unit.proof === "string" &&
                        <button
                            onClick={handleEditProof}
                            className={`
                            w-8 h-8 flex items-center justify-center text-sm border rounded-sm hover:text-neutral-500
                            ${proofIsAltered ? " border-orange-200 text-orange-500 hover:text-orange-400" : ""}
                        `}
                        >
                            {editingProof
                                ? <i className="bi bi-x-lg"></i>
                                : <i className="bi bi-slash-lg"></i>
                            }
                        </button>
                    }
                    {typeof unit.proof !== "string" &&
                        <div className="w-8 h-8"></div>
                    }
                    <button
                        className="w-8 h-8 flex items-center justify-center text-sm border rounded-sm hover:text-neutral-500"
                        onClick={handleRenameUnit}
                    >
                        <i className="bi bi-input-cursor"></i>
                    </button>
                    <button
                        className="w-8 h-8 flex items-center justify-center text-sm border rounded-sm hover:text-neutral-500"
                        onClick={handleMoveUnit}
                    >
                        <i className="bi bi-arrow-down-up"></i>
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
                        spellCheck="false"
                        rows={10}
                        onChange={handleContentChange}
                        value={unit.content}
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
            {editingProof &&
                <div className="flex">
                    <textarea
                        className="w-full outline-none bg-neutral-50 p-2 font-mono text-xs text-neutral-800"
                        spellCheck="false"
                        rows={10}
                        onChange={handleProofChange}
                        value={unit.proof}
                    >

                    </textarea>
                    <div className="grid grid-rows-2 min-w-12 border-l border-r gap-[1px] bg-gray-200">
                        <button
                            className="text-sm text-neutral-400 hover:text-neutral-700 bg-white"
                            onClick={handleResetProofEdit}
                        >
                            <i className="bi bi-arrow-counterclockwise"></i>
                        </button>
                        <button
                            className="text-sm text-neutral-400 hover:text-neutral-700 bg-white"
                            onClick={handleSubmitProofEdit}
                        >
                            <i className="bi bi-check2"></i>
                        </button>
                    </div>
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