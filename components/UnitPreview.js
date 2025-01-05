import PartPreview from "./PartPreview";

export default function UnitPreview({ chapterIndex, sectionIndex, unit }) {
    return (
        <div>
            {unit.type !== "paragraph" &&
                <div className="p-2 flex gap-3 items-center">
                    <div className="w-10">
                        {unit.number}
                    </div>
                    <div className="w-6 text-neutral-500">
                        {unit.type.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        {unit.name}
                    </div>
                </div>
            }
            <div>
                {unit.content}
            </div>
            {unit.proof &&
                <div>
                    Proof: {unit.proof}
                </div>
            }
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
        </div >
    );
};