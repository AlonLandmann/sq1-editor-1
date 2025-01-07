import { intToRoman } from "@/lib/roman";

export default function PartPreview({ chapterIndex, sectionIndex, unitIndex, part }) {
    return (
        <div>
            <div className="p-2 flex gap-3 items-center">
                <div className="w-10 text-base text-center text-neutral-400">
                    {intToRoman(part.index + 1)}
                </div>
                {part.name &&
                    <div>
                        ({part.name})
                    </div>
                }
                <div>
                    {part.content}
                </div>
            </div>
            {/* {part.proof && <></>} */}
        </div>
    );
};