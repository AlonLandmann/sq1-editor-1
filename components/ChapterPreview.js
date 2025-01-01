import SectionPreview from "./SectionPreview";

export default function ChapterPreview({ chapter }) {
    return (
        <div>
            <div className="p-2 flex gap-3 items-center">
                <div className="font-medium text-xl w-10">
                    {chapter.index + 1}
                </div>
                <div className="font-medium text-xl">
                    {chapter.name}
                </div>
            </div>
            <div>
                {chapter.sections.map(section => (
                    <SectionPreview
                        key={section.id}
                        chapterIndex={chapter.index}
                        section={section}
                    />
                ))}
            </div>
        </div>
    );
};