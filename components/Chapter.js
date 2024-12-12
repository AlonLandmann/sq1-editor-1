import Section from "./Section";

export default function Chapter({ chapter }) {
    async function handleAddSection() {
        const res = await fetch(`/api/add-section?chapterId=${chapter.id}`, { method: "POST" });
        const json = await res.json();

        if (json.success) {
            window.location.reload();
        }
    }

    async function handleDeleteChapter() {
        if (confirm("Delete chapter?")) {
            const res = await fetch(`/api/delete-chapter?chapterId=${chapter.id}`, { method: "DELETE" });
            const json = await res.json();

            if (json.success) {
                window.location.reload();
            } else {
                window.alert(json.message);
            }
        }
    }

    async function handleRenameChapter() {
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
            <div className="flex gap-2">
                <button
                    className="py-1 px-2 text-sm underline hover:text-neutral-500"
                    onClick={handleAddSection}
                >
                    Add section
                </button>
                <button
                    className="py-1 px-2 text-sm underline hover:text-neutral-500"
                    onClick={handleDeleteChapter}
                >
                    Delete chapter
                </button>
                <button
                    className="py-1 px-2 text-sm underline hover:text-neutral-500"
                    onClick={handleRenameChapter}
                >
                    Rename chapter
                </button>
                <div>Id: {chapter.id}</div>
                <div>Index: {chapter.index}</div>
                <div>Name: {chapter.name}</div>
            </div>
            <div className="ml-16">
                {chapter.sections.map(section => (
                    <Section
                        key={section.id}
                        section={section}
                    />
                ))}
            </div>
        </div>
    );
};