export default function Part({ chapterIndex, sectionIndex, unitIndex, part }) {
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
        <div className="p-2 flex gap-3 items-center">
            <div className="text-sm w-10">
                {chapterIndex + 1}.{sectionIndex + 1}.{unitIndex + 1}.{part.index + 1}
            </div>
            <div className="text-sm">
                Name: {part.name}
            </div>
            <div>Content: {part.content}</div>
            <div>Proof: {part.proof}</div>
            <div className="flex gap-2 ml-auto">
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
    );
};