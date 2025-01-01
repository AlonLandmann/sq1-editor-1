export default function PartPreview({ chapterIndex, sectionIndex, unitIndex, part }) {
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
        </div>
    );
};