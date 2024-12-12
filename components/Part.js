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

    return (
        <div className="flex gap-2">
            <button
                className="py-1 px-2 text-sm underline hover:text-neutral-500"
                onClick={handleDelete}
            >
                Delete part
            </button>
            <div>Id: {part.id}</div>
            <div>Index: {part.index}</div>
            <div>Content: {part.content}</div>
            <div>Proof: {part.proof}</div>
        </div>
    );
};