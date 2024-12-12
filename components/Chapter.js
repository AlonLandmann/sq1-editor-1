import Section from "./Section";

export default function Chapter({ chapter }) {
    async function addSection() {
        const res = await fetch(`/api/add-section?chapterId=${chapter.id}`, { method: "POST" });
        const json = await res.json();

        if (json.success) {
            window.location.reload();
        }
    }

    return (
        <div>
            <div className="flex gap-2">
                <button
                    className="py-1 px-2 text-sm underline hover:text-neutral-500"
                    onClick={addSection}
                >
                    Add section
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