import Paragraph from "./Paragraph";
import PartPreview from "./PartPreview";

export default function UnitPreview({ chapterIndex, sectionIndex, unit }) {
    if (unit.type === "paragraph") {
        return <Paragraph unit={unit} />;
    }

    return (
        <div className="border rounded-sm px-[24px] py-4">
            <div className="flex items-center text-neutral-400 mb-2">
                <div className="mr-3">
                    {unit.type.charAt(0).toUpperCase()}{unit.type.slice(1)}
                </div>
                <div className="mr-6">
                    {unit.number}
                </div>
                <div>
                    {unit.name}
                </div>
            </div>
            <div>
                {unit.content}
            </div>
            {unit.proof &&
                <div>
                    Proof: {unit.proof}
                </div>
            }
            <div className="flex flex-col gap-[2px] mt-2">
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