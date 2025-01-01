import UnitPreview from "./UnitPreview";

export default function SectionPreview({ chapterIndex, section }) {
    return (
        <div>
            <div className="p-2 flex gap-3 items-center">
                <div className="text-lg w-10">
                    {chapterIndex + 1}.{section.index + 1}
                </div>
                <div className="text-lg">
                    {section.name}
                </div>
            </div>
            <div>
                {section.units.map(unit => (
                    <UnitPreview
                        key={unit.id}
                        chapterIndex={chapterIndex}
                        sectionIndex={section.index}
                        unit={unit}
                    />
                ))}
            </div>
        </div>
    );
};