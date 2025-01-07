import SectionPreview from "./SectionPreview";

export default function ChapterPreview({ chapter }) {
    return (
        <div>
            <div className="flex gap-2 items-center px-6">
                <div className="font-medium text-3xl w-8">
                    {chapter.index + 1}
                </div>
                <div className="font-medium text-3xl">
                    {chapter.name}
                </div>
            </div>
            <div className="flex flex-col py-10 gap-6">
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