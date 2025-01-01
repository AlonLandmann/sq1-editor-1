import PartPreview from "./PartPreview";

export default function UnitPreview({ chapterIndex, sectionIndex, unit }) {
    return (
        <div>
            <div className="p-2 flex gap-3 items-center">
                {unit.type !== "paragraph" &&
                    <div className="w-10">
                        {chapterIndex + 1}.{sectionIndex + 1}.{unit.index + 1}
                    </div>
                }
                {unit.type !== "paragraph" &&
                    <div className="w-6 text-neutral-500">
                        {unit.type.charAt(0).toUpperCase()}
                    </div>
                }
                {unit.type !== "paragraph" &&
                    <div>
                        {unit.name}
                    </div>
                }
                {unit.type === "paragraph" &&
                    <div>
                        {unit.content}
                    </div>
                }
            </div>
            <div className="ml-8">
                {unit.parts.map(part => (
                    <PartPreview
                        key={part.id}
                        chapterIndex={chapterIndex}
                        sectionIndex={sectionIndex}
                        unitIndex={unit.index}
                        part={part}
                    />
                ))}
            </div>
        </div>
    );
};