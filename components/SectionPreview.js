import UnitPreview from "./UnitPreview";

export default function SectionPreview({ chapterIndex, section }) {
    return (
        <div>
            <div className="flex gap-2 items-center px-6">
                <div className="text-2xl text-neutral-500 w-8">
                    {chapterIndex + 1}.{section.index + 1}
                </div>
                <div className="text-2xl text-neutral-500">
                    {section.name}
                </div>
            </div>
            <div className="flex flex-col py-5 gap-5 text-[17px] leading-tight text-[#333]">
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