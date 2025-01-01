import PartPreview from "./PartPreview";

export default function UnitPreview({ chapterIndex, sectionIndex, unit }) {
    return (
        <div>
            <div className="p-2 flex gap-3 items-center">
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