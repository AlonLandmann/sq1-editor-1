export default function Part({ part }) {
    async function handleDelete() {
        if (confirm("Delete part?")) {
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
        <div className="flex gap-2">
            <button
                className="py-1 px-2 text-sm underline hover:text-neutral-500"
                onClick={handleDelete}
            >
                Delete part
            </button>
            <button
                className="py-1 px-2 text-sm underline hover:text-neutral-500"
                onClick={handleRenamePart}
            >
                Rename part
            </button>
            <div>Id: {part.id}</div>
            <div>Index: {part.index}</div>
            <div>Name: {part.name}</div>
            <div>Content: {part.content}</div>
            <div>Proof: {part.proof}</div>
        </div>
    );
};